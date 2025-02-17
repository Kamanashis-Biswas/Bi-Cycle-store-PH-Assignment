import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  NODE_DEV: process.env.NODE_DEV,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
};
