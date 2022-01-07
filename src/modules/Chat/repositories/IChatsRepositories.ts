import { Chat } from '@prisma/client';

import { ICreateChatDTO } from '../dtos/ICreateChatDTO';

export interface IChatsRepositories {
  create(data: ICreateChatDTO): Promise<Chat>;
}
