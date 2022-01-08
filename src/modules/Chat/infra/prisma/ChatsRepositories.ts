import { ICreateChatDTO } from '@modules/Chat/dtos/ICreateChatDTO';
import { IChatsRepositories } from '@modules/Chat/repositories/IChatsRepositories';
import { Chat, Prisma } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
class ChatsRepositories implements IChatsRepositories {
  constructor(
    @inject('PrismaClient')
    private prisma: Prisma.ChatDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation
    >,
  ) {}

  async create({ users }: ICreateChatDTO): Promise<Chat> {
    const usersIds = users.map(user => ({ id: user.id }));

    const chat = await this.prisma.create({
      data: {
        participants: {
          connect: usersIds,
        },
      },
    });

    return chat;
  }

  async findByUsers(usersIds: string[]): Promise<Chat | undefined> {
    const chat = await this.prisma.findFirst({
      where: {
        participants: {
          every: {
            id: {
              in: usersIds,
            },
          },
        },
      },
    });

    return chat;
  }

  async findById(id: string): Promise<Chat | undefined> {
    const chat = await this.prisma.findUnique({
      where: {
        id,
      },
    });

    return chat;
  }
}

export { ChatsRepositories };
