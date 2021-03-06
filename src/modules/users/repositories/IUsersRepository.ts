import { User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserSocketIdDTO } from '../dtos/updateUserSocketIdDTO';

export interface IUsersRepository {
  findBySocketId(socketId: string): Promise<User | undefined>;
  findByLogin(login: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findManyByLogins(logins: string[]): Promise<User[]>;
  updateUserSocketId(data: IUpdateUserSocketIdDTO): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
}
