// import { handleInput } from "../services/chatbotService.js";
// import logger from '../logger/logger.js';


// const handleChat = async (req, res) => {
//   const { deviceId, input } = req.body;
//   try {
//     const response = await handleInput(deviceId, input);
//     res.json({ response });
//   } catch (error) {
//     logger.error("Error handling input:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default handleChat;