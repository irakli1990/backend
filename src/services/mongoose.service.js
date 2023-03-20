import mongoose from "mongoose";
import { config } from "../config/config";
import { User, USER_ROLE } from "../models/user.model";

const user = {
  login: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
  role: USER_ROLE.ADMIN,
};

const connect = async () => {
  const connection = await mongoose.connect(config.mongodb);
  if (connection) {
    return connection;
  } else {
    throw Error("Error database connect");
  }
};

const seed = async () => {
  const admin = await User.findOne({ login: user.login });
  if (!admin) {
    User.collection.insertOne(user);
  }
};

export const database = {
  connect: connect,
  seed: seed,
};
