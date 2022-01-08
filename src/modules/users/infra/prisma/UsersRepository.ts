import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUpdateUserSocketIdDTO } from '@modules/users/dtos/updateUserSocketIdDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { PrismaClient, User } from '@prisma/client';

class UsersRepository implements IUsersRepository {
  private prisma = new PrismaClient().user;

  async findBySocketId(socketId: string): Promise<User | undefined> {
    const user = await this.prisma.findUnique({
      where: {
        socket_id: socketId,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findManyByEmails(emails: string[]): Promise<User[]> {
    const users = await this.prisma.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    return users;
  }

  async updateUserSocketId({
    id,
    socket_id,
  }: IUpdateUserSocketIdDTO): Promise<User> {
    const user = await this.prisma.update({
      where: {
        id,
      },
      data: {
        socket_id,
      },
    });

    return user;
  }

  async create({
    name,
    email,
    avatar_url,
    socket_id,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.prisma.create({
      data: { name, email, avatar_url, socket_id },
    });

    return user;
  }
}

export { UsersRepository };
