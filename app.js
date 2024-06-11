import express from "express";
import { join } from "path";
import { fileURLToPath } from "url";
import chatbotRoutes from "./routes/chatbot.route.js";
import connectToMongoDb from "./db/mongodb.js";
import CONFIG from "./config/config.js";
import cookieParser from "cookie-parser";
import generateSessionId from "./middlewares/session.middleware.js";

const app = express();
const port = CONFIG.PORT || 3000;

// Connect to MongoDB
connectToMongoDb();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(generateSessionId);

// Set up routes
app.use("/api/chatbot", chatbotRoutes);

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");
app.use(express.static(join(__dirname, "views")));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://${CONFIG.LOCAL_HOST}:${port}/`);
});
