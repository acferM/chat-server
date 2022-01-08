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

  async find15ByChatId({
    chat_id,
    page = 1,
  }: IFind15ByChatIdDTO): Promise<Message[]> {
    const start = (page - 1) * 15;
    const end = page * 15;

    const messages = this.messages.filter(
      message => message.chatId === chat_id,
    );

    return messages.slice(start, end);
  }
}

export { FakeMessagesRepository };
