import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    // generate a salt
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

userSchema.static = {};

export const User = mongoose.model("user", userSchema);
