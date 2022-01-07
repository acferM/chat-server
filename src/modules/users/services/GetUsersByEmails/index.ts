import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class GetUsersByEmailsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(emails: string[]) {
    const users = await this.usersRepository.findManyByEmails(emails);

    return users;
  }
}

export { GetUsersByEmailsService };
