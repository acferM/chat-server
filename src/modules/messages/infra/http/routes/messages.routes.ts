import { Router } from 'express';

import { MessagesByChatController } from '../controllers/MessagesByChatController';

const messagesByChatController = new MessagesByChatController();

const messagesRouter = Router();

messagesRouter.get('/:chat_id', messagesByChatController.index);

export { messagesRouter };
