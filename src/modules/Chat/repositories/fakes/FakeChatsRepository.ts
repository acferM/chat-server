import { Chat, Message, User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateChatDTO } from '../../dtos/ICreateChatDTO';
import { IChatsRepositories } from '../IChatsRepositories';

type ChatWithRelations = Chat & {
  participants: User[];
  messages: Message[];
};

class FakeChatsRepository implements IChatsRepositories {
  private chats: ChatWithRelations[] = [];

  async create({ users }: ICreateChatDTO): Promise<Chat> {
    const chat: ChatWithRelations = {
      id: uuid(),
      participants: users,
      messages: [],
    };

    this.chats.push(chat);

    return chat;
  }

  async findByUsers(usersIds: string[]): Promise<Chat | undefined> {
    const chat = this.chats.find(chat =>
      chat.participants.every(user => usersIds.includes(user.id)),
    );

    return chat;
  }
}

export { FakeChatsRepository };
