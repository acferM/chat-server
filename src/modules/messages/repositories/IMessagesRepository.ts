import { Message } from '@prisma/client';

import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';

export interface IMessagesRepository {
  create(data: ICreateMessageDTO): Promise<Message>;
  find15ByChatId(data: IFind15ByChatIdDTO): Promise<Message[]>;
}
