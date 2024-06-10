import { getOptions, handleUserSelection } from '../services/chatbotService.js';

export const chat = async (req, res) => {
  const { sessionId, message } = req.body;
  
  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message are required.' });
  }

  const response = await handleUserSelection(sessionId, message);
  res.json({ response });
};

export const getChatOptions = (req, res) => {
  res.json({ response: getOptions() });
};
