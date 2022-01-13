import { IChatsRepositories } from '@modules/Chat/repositories/IChatsRepositories';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Chat } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  login: string;
  socket_id: string;
}

@injectable()
class CreateChatByUserLoginService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepositories,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ login, socket_id }: IRequest): Promise<Chat> {
    const user = await this.usersRepository.findByLogin(login);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const requestUser = await this.usersRepository.findBySocketId(socket_id);

    if (!requestUser) {
      throw new AppError('Request User not found', 404);
    }

    const chatExists = await this.chatsRepository.findByUsers([
      user.id,
      requestUser.id,
    ]);

    if (chatExists) {
      return chatExists;
    }

    const chat = await this.chatsRepository.create({
      users: [user, requestUser],
    });

    return chat;
  }
}

export { CreateChatByUserLoginService };
