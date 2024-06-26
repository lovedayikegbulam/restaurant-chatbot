import { handleUserSelection } from "../services/chatbotService.js";
import { getOptions } from "../utils/order.selection.js";

export const chat = async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res
      .status(400)
      .json({ error: "sessionId and message are required." });
  }

  const response = await handleUserSelection(sessionId, message);
  res.json({ response });
};

export const getChatOptions = (req, res) => {
  const sessionId = req.cookies.sessionId;
  res.json({ sessionId, response: getOptions() });
};
