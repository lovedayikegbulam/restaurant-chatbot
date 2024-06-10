import express from "express";
import http from "http";
import { Server } from "socket.io";
import chatbotRoute from "./routes/chatbot.route.js";
import { startSession, handleInput } from "./services/chatbotService.js";
import logger from "./logger/logger.js";
import CONFIG from "./config/config.js";
import connectToMongoDb from "./db/mongodb.js";


const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to Mongodb Database
connectToMongoDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use("/chat", chatbotRoute);

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


io.on("connection", (socket) => {
  logger.info("a user connected");

  socket.on("user message", async (msg) => {
    const deviceId = socket.id;
    await startSession(deviceId); // Ensure the session is started only once per connection
    const response = await handleInput(deviceId, msg);
    socket.emit("bot message", response);
  });

  socket.on("disconnect", () => {
    logger.info("user disconnected");
  });
});


server.listen(PORT, () => {
  logger.info(`Server running at http://${CONFIG.LOCAL_HOST}:${PORT}/`);
});
