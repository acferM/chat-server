import { ICreateMessageDTO } from '@modules/messages/dtos/ICreateMessageDTO';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { Message, Prisma } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

@injectable()
class MessagesRepository implements IMessagesRepository {
  constructor(
    @inject('PrismaClientMessages')
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
        to: {
          include: {
            participants: true,
          },
        },
      },
    });

    return message;
  }

  async find15ByChatId({
    chat_id,
    page = 1,
  }: IFind15ByChatIdDTO): Promise<Message[]> {
    const start = (page - 1) * 15;

    const messages = await this.prisma.findMany({
      where: {
        chatId: chat_id,
      },
      take: 15,
      skip: start,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        from: true,
      },
    });

    return messages;
  }
}

export { MessagesRepository };
