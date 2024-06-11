import { v4 as uuidv4 } from "uuid";

// Middleware to generate and set session ID
const generateSessionId = (req, res, next) => {
  if (!req.cookies.sessionId) {
    const sessionId = uuidv4();
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day
  }
  next();
};

export default generateSessionId;
