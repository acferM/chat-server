import { User } from '@prisma/client';

export interface ICreateChatDTO {
  users: User[];
}
