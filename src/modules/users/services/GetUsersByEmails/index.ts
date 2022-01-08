import { inject, injectable } from 'tsyringe';

import { IRequestProvider } from '@shared/container/providers/RequestProvider/models/IRequestProvider';

import { IUsersRepository } from '../../repositories/IUsersRepository';

type GitUser = {
  email: string;
};

@injectable()
class GetUsersByEmailsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RequestProvider')
    private requestProvider: IRequestProvider,
  ) {}

  async execute(emailsUrl: string) {
    const { data: gitUsers } = await this.requestProvider.get<GitUser[]>(
      emailsUrl,
    );

    const emails = gitUsers.map(user => user.email);

    const users = await this.usersRepository.findManyByEmails(emails);

    return users;
  }
}

export { GetUsersByEmailsService };
