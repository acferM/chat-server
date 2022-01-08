import { GetUsersByEmailsService } from '@modules/users/services/GetUsersByEmails';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersByEmailController {
  async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const getUsersByEmail = container.resolve(GetUsersByEmailsService);

    const users = await getUsersByEmail.execute(
      `https://api.github.com/users/${username}/following`,
    );

    return response.json(users);
  }
}

export { UsersByEmailController };
