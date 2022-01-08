import { ICreateMessageDTO } from '@modules/messages/dtos/ICreateMessageDTO';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { Message, Prisma } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
class MessagesRepository implements IMessagesRepository {
  constructor(
    @inject('PrismaClient')
    private prisma: Prisma.MessageDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation
    >,
  ) {}

  async create({ text, fromId, toId }: ICreateMessageDTO): Promise<Message> {
    const message = this.prisma.create({
      data: {
        text,
        from: {
          connect: {
            id: fromId,
          },
        },
        to: {
          connect: {
            id: toId,
          },
        },
      },
      include: {
        from: true,
      },
    });

    return message;
  }
}

export { MessagesRepository };
