import mongoose from "mongoose";
import bcrypt from "bcrypt";
import status from "http-status";

export const USER_ROLE = {
  ADMIN: "ADMIN",
  GUEST: "GUEST",
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: USER_ROLE,
      default: USER_ROLE.GUEST,
    },
  },
  {
    toJSON: {
      transform: (_, ret, __) => {
        delete ret.password;
        return ret;
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.method({
  passwordMatches: async function (password) {
    return bcrypt.compareSync(password, this.password);
  },
});

userSchema.statics = {
  checkDuplicateEmailError: (error) => {
    const validationError = new Error();
    if (error.name === "ValidationError") {
      validationError.message = error.message;
      validationError.status = status.CONFLICT;
      return validationError;
    }
    validationError.message = error.message;
    validationError.status = status.BAD_REQUEST;
    return validationError;
  },
  findAndGenerateToken: async function (payload) {
    const error = new Error();
    const { email, password } = payload;
    if (!email) {
      error.message = "Email must be provided for auth";
      error.status = status.BAD_REQUEST;
      throw error;
    }
    const user = await this.findOne({ email }).exec();
    if (!user) {
      error.message = `No user associated with ${email}`;
      error.status = status.BAD_REQUEST;
      throw error;
    }
    const passwordOK = await user.passwordMatches(password);
    if (!passwordOK) {
      error.message = "Password mismatch";
      error.status = status.UNAUTHORIZED;
      throw error;
    }
    return user;
  },
};

export const User = mongoose.model("user", userSchema);
