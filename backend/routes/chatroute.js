import express from "express";
import { getChats, getMessages, sendMessage, getChatInfo } from "../controllers/chat.controller.js";
 
const router = express.Router();

router.get('/:userId', getChats);
router.get('/getinfo/:chatId', getChatInfo);
router.get('/:chatId/messages', getMessages);
router.post('/send', sendMessage);

export default router;