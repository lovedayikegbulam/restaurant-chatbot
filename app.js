import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import chatbotRoutes from './routes/chatbot.route.js';
import { startSession, handleInput } from './services/chatbotService.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('views'));
app.use('/chat', chatbotRoutes);

io.on('connection', (socket) => {
    logger.info('a user connected');

  socket.on('user message', async (msg) => {
    const deviceId = socket.id;
    await startSession(deviceId); // Ensure the session is started only once per connection
    const response = await handleInput(deviceId, msg);
    socket.emit('bot message', response);
  });

  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
