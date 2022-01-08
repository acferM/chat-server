import { messagesRouter } from '@modules/messages/infra/http/routes/messages.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/messages', messagesRouter);

export { routes };
