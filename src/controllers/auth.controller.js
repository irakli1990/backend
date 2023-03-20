import { User } from "../models/user.model";
import status from "http-status";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      config.jwtSecret
    );
    return res.status(status.OK).json({
      accessToken: token,
    });
  } catch (error) {
    next(res.status(error.status).json({ message: error.message }));
  }
};

const register = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(status.CREATED).json({ data: user });
  } catch (error) {
    next(User.checkDuplicateEmailError(error));
  }
};

export const authController = { login, register };
