import { Router } from 'express';

import { UsersByLoginController } from '../controllers/UsersByLoginController';

const usersByLoginController = new UsersByLoginController();

const usersRouter = Router();

usersRouter.get('/:username', usersByLoginController.index);

export { usersRouter };
