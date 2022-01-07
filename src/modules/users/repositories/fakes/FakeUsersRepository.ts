import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserSocketIdDTO } from '../../dtos/updateUserSocketIdDTO';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async findManyByEmails(emails: string[]): Promise<User[]> {
    const users = this.users.filter(user => emails.includes(user.email));

    return users;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user: User = {
      id: uuid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  public async updateUserSocketId({
    id,
    socket_id,
  }: IUpdateUserSocketIdDTO): Promise<User> {
    const user = this.users.find(user => user.id === id);

    user.socket_id = socket_id;

    const userIndex = this.users.findIndex(user => user.id === id);

    this.users[userIndex] = user;

    return user;
  }
}

export { FakeUsersRepository };
