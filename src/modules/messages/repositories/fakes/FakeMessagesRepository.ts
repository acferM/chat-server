import { ICreateMessageDTO } from '@modules/messages/dtos/ICreateMessageDTO';
import { Message } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { IMessagesRepository } from '../IMessagesRepository';

class FakeMessagesRepository implements IMessagesRepository {
  private messages: Message[] = [];

  async create({ text, fromId, toId }: ICreateMessageDTO): Promise<Message> {
    const message: Message = {
      id: uuid(),
      text,
      chatId: toId,
      userId: fromId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.messages.push(message);

    return message;
  }
}

export { FakeMessagesRepository };
