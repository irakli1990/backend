import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongodb: process.env.MONGO_DB_URL,
  jwtSecret: process.env.JWT_SECRET,
};
