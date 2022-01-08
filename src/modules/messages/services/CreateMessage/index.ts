import { IChatsRepositories } from '@modules/Chat/repositories/IChatsRepositories';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Message } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

type MessagesWithRelations = Message & {
  to: {
    participants: {
      socket_id: string;
    }[];
  };
};

interface IRequest {
  text: string;
  socket_id: string;
  toId: string;
}

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ChatRepository')
    private chatRepository: IChatsRepositories,
  ) {}

  async execute({
    text,
    socket_id,
    toId,
  }: IRequest): Promise<MessagesWithRelations> {
    const user = await this.usersRepository.findBySocketId(socket_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const chatExists = await this.chatRepository.findById(toId);

    if (!chatExists) {
      throw new AppError('Chat not found', 404);
    }

    const message = await this.messagesRepository.create({
      text,
      fromId: user.id,
      toId,
    });

    return message as MessagesWithRelations;
  }
}

export { CreateMessageService };
