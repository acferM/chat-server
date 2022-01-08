import { IChatsRepositories } from '@modules/Chat/repositories/IChatsRepositories';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { Message } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  chat_id: string;
  page?: number;
}

@injectable()
class Get15MessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('ChatsRepository')
    private chatsRepository: IChatsRepositories,
  ) {}

  async execute({ chat_id, page = 1 }: IRequest): Promise<Message[]> {
    const chatExists = await this.chatsRepository.findById(chat_id);

    if (!chatExists) {
      throw new AppError('Chat not found', 404);
    }

    const messages = await this.messagesRepository.find15ByChatId({
      chat_id,
      page,
    });

    return messages;
  }
}

export { Get15MessagesService };
