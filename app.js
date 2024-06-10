import express from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.route.js';
import connectToMongoDb from './db/mongodb.js';
import CONFIG from "./config/config.js"

const app = express();
const port = CONFIG.PORT || 3000;

// Connect to MongoDB
connectToMongoDb();

// Middleware to parse JSON
app.use(express.json());

// Set up routes
app.use('/api/chatbot', chatbotRoutes);

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
app.use(express.static(join(__dirname, 'views')));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://${CONFIG.LOCAL_HOST}:${CONFIG.PORT}/`);
});
