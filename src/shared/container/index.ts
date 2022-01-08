import { ChatsRepositories } from '@modules/Chat/infra/prisma/ChatsRepositories';
import { IChatsRepositories } from '@modules/Chat/repositories/IChatsRepositories';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { UsersRepository } from '@modules/users/infra/prisma/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';
import './providers';

const prismaClient = new PrismaClient();

container.registerInstance('PrismaClientUsers', prismaClient.user);
container.registerInstance('PrismaClientMessages', prismaClient.message);
container.registerInstance('PrismaClientChats', prismaClient.chat);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);

container.registerSingleton<IChatsRepositories>(
  'ChatsRepository',
  ChatsRepositories,
);
