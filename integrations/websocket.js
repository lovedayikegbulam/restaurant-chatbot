import { startSession, handleInput } from "../services/chatbotService.js";
import logger from "../logger/logger.js";

const webSocket = (io) => {
  io.on("connection", (socket) => {
    logger.info("A user connected");

    socket.on("user message", async (msg) => {
      const deviceId = socket.id;
      await startSession(deviceId); // Ensure the session is started only once per connection
      const response = await handleInput(deviceId, msg);
      socket.emit("bot message", response);
    });

    socket.on("disconnect", () => {
      logger.info("A user disconnected");
    });
  });
};

export default webSocket;
