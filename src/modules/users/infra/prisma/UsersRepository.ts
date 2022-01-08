import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUpdateUserSocketIdDTO } from '@modules/users/dtos/updateUserSocketIdDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Prisma, User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
class UsersRepository implements IUsersRepository {
  constructor(
    @inject('PrismaClient')
    private prisma: Prisma.UserDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation
    >,
  ) {}

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
