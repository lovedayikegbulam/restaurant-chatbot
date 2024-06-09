import mongoose from "mongoose";
import CONFIG from "../config/config.js";
import logger from "../../logger/logger.js";

const connectToMongoDb = async () => {
  const MONGODB_URI = CONFIG.MONGODB_URI;

  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      logger.info("Connection to DB successful");
    } catch (error) {
      logger.info("Connection to DB failed");
      logger.error(error);
    }
  } else {
    logger.info("MongoDB URI is not provided");
  }

  // Add event listeners
  mongoose.connection.on("connected", () => {
    logger.info("Connection to DB successful");
  });

  mongoose.connection.on("error", (err) => {
    logger.info("Connection to DB failed");
    logger.error(err);
  });
};

export default connectToMongoDb;
