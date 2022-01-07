import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Chat } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IRequestProvider } from '@shared/container/providers/RequestProvider/models/IRequestProvider';

import { IChatsRepositories } from '../../repositories/IChatsRepositories';

type GitResponse = {
  email: string;
};

interface IRequest {
  emailsUrl: string;
}

@injectable()
class CreateChatService {
  constructor(
    @inject('ChatsRepositories')
    private chatsRepository: IChatsRepositories,

    @inject('UsersRepositories')
    private usersRepository: IUsersRepository,

    @inject('RequestProvider')
    private requestProvider: IRequestProvider,
  ) {}

  async execute({ emailsUrl }: IRequest): Promise<Chat> {
    const { data: gitUsers } = await this.requestProvider.get<GitResponse[]>(
      emailsUrl,
    );

    const usersEmails = gitUsers.map(gitUser => gitUser.email);

    const users = await this.usersRepository.findManyByEmails(usersEmails);

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
