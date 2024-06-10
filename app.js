import express from "express";
import http from "http";
import { Server } from "socket.io";
import chatbotRoute from "./routes/chatbot.route.js";
import logger from "./logger/logger.js";
import CONFIG from "./config/config.js";
import connectToMongoDb from "./db/mongodb.js";
import webSocket from "./integrations/websocket.js"

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
import { join } from "path";
import { fileURLToPath } from "url";

// Connect to Mongodb Database
connectToMongoDb();

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "views")));
app.use("", chatbotRoute);

webSocket(io);

// catch all route
app.all("*", (req, res) => {
  logger.info("Route not found");
  res.status(404).json({
    message: "Page Not found",
  });
});

//Error handler middleware
app.use((err, req, res, next) => {
  logger.error(err);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);
  next();
});


server.listen(PORT, () => {
  logger.info(`Server running at http://${CONFIG.LOCAL_HOST}:${PORT}/`);
});
