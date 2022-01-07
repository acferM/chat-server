import { User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserSocketIdDTO } from '../dtos/updateUserSocketIdDTO';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findManyByEmails(emails: string[]): Promise<User[]>;
  updateUserSocketId(data: IUpdateUserSocketIdDTO): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
}
