import { GetUsersByEmailsService } from '@modules/users/services/GetUsersByEmails';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersByEmailController {
  async index(request: Request, response: Response): Promise<Response> {
    const { emailsUrl } = request.params;

    const getUsersByEmail = container.resolve(GetUsersByEmailsService);

    const users = await getUsersByEmail.execute(emailsUrl);

    return response.json(users);
  }
}

export { UsersByEmailController };
