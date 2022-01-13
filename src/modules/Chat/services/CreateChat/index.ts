import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Chat } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IRequestProvider } from '@shared/container/providers/RequestProvider/models/IRequestProvider';

import { IChatsRepositories } from '../../repositories/IChatsRepositories';

type GitUser = {
  login: string;
};

@injectable()
class CreateChatService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepositories,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RequestProvider')
    private requestProvider: IRequestProvider,
  ) {}

  async execute(usersUrl: string): Promise<Chat> {
    const { data: gitUsers } = await this.requestProvider.get<GitUser[]>(
      usersUrl,
    );

    const usersLogins = gitUsers.map(gitUser => gitUser.login);

    const users = await this.usersRepository.findManyByLogins(usersLogins);

    const usersIds = users.map(user => user.id);

    const chatRoomExists = await this.chatsRepository.findByUsers(usersIds);

    if (chatRoomExists) {
      return chatRoomExists;
    }

    const chat = await this.chatsRepository.create({
      users,
    });

    return chat;
  }
}

export { CreateChatService };
