import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  LOCAL_HOST: process.env.LOCAL_HOST,
};

export default config;
