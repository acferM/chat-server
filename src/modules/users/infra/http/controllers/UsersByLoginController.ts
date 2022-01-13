import { GetUsersByLoginsService } from '@modules/users/services/GetUsersByLogins';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersByLoginController {
  async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const getUsersByLogins = container.resolve(GetUsersByLoginsService);

    const users = await getUsersByLogins.execute(
      `https://api.github.com/users/${username}/following`,
    );

    return response.json(users);
  }
}

export { UsersByLoginController };
