import { Router } from 'express';

import { UsersByEmailController } from '../controllers/UsersByEmailController';

const usersByEmailController = new UsersByEmailController();

const usersRouter = Router();

usersRouter.get('/:username', usersByEmailController.index);

export { usersRouter };
