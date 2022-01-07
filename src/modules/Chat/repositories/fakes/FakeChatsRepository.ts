import { Chat, Message, User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateChatDTO } from '../../dtos/ICreateChatDTO';
import { IChatsRepositories } from '../IChatsRepositories';

type ChatWithRelations = Chat & {
  participants: User[];
  messages: Message[];
};

class FakeChatsRepository implements IChatsRepositories {
  private chats: Chat[] = [];

  async create({ users }: ICreateChatDTO): Promise<Chat> {
    const chat: ChatWithRelations = {
      id: uuid(),
      participants: users,
      messages: [],
    };

    this.chats.push(chat);

    return chat;
  }
}

export { FakeChatsRepository };
