import { Router } from 'express';
import { chat, getChatOptions } from '../controllers/chatbotController.js';

const router = Router();

router.post('/chat', chat);
router.get('/options', getChatOptions);

export default router;
