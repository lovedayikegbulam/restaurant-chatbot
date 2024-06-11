import { v4 as uuidv4 } from "uuid";

// Middleware to generate and set session ID
const sessionMiddleware = (req, res, next) => {
  if (!req.cookies.sessionId) {
    const sessionId = uuidv4();
    res.cookie("sessionId", sessionId, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    }); // 1 day
  }
  next();
};

export default sessionMiddleware;
