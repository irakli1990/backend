import { User } from "../models/user.model";
import status from "http-status";

const catcher = (error) => {
  const status_code = status.INTERNAL_SERVER_ERROR;
  return res.status(status_code).json({ error: error.massage });
};

const get_users = async (_, res, __) => {
  const users = await User.find().catch(catcher);
  res.status(status.OK).json({ data: users });
};

export const usersController = { get_users };
