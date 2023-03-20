import { User } from "../models/user.model";

const catcher = (error) => res.status(500).json({ error: error.massage });

const get_users = async (_, res, __) => {
  const users = await User.find().catch(catcher);
  res.status(200).json({ data: users });
};

const save_user = async (req, res, __) => {
  const user = await User.create({ ...req.body }).catch(catcher);
  res.status(201).json({ data: user });
};

export const usersController = { get_users, save_user };
