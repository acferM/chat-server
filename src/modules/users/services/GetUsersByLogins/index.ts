import { inject, injectable } from 'tsyringe';

import { IRequestProvider } from '@shared/container/providers/RequestProvider/models/IRequestProvider';

import { IUsersRepository } from '../../repositories/IUsersRepository';

type GitUser = {
  login: string;
};

@injectable()
class GetUsersByLoginsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RequestProvider')
    private requestProvider: IRequestProvider,
  ) {}

  async execute(usersUrl: string) {
    const { data: gitUsers } = await this.requestProvider.get<GitUser[]>(
      usersUrl,
    );

    const logins = gitUsers.map(user => user.login);

    const users = await this.usersRepository.findManyByLogins(logins);

    return users;
  }
}

export { GetUsersByLoginsService };
