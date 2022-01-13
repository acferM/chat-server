import { FakeChatsRepository } from '@modules/Chat/repositories/fakes/FakeChatsRepository';
import { FakeMessagesRepository } from '@modules/messages/repositories/fakes/FakeMessagesRepository';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateMessageService } from '.';

let fakeMessagesRepository: FakeMessagesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeChatRepository: FakeChatsRepository;
let createMessage: CreateMessageService;

describe('Create Message Service', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeChatRepository = new FakeChatsRepository();
    createMessage = new CreateMessageService(
      fakeMessagesRepository,
      fakeUsersRepository,
      fakeChatRepository,
    );
  });

  it('should be able to create a new message', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'fake login',
      email: 'John@doe.com',
      avatar_url: 'John.jpg',
      socket_id: 'socket',
    });

    const chat = await fakeChatRepository.create({
      users: [user],
    });

    const message = await createMessage.execute({
      text: 'Hello World',
      socket_id: user.socket_id,
      toId: chat.id,
    });

    expect(message).toHaveProperty('id');
  });

  it('should not be able to create a new message from a inexistent user', async () => {
    const chat = await fakeChatRepository.create({
      users: [
        {
          id: 'fake-id',
          name: 'fake name',
          login: 'fake login',
          email: 'fake@email.com',
          avatar_url: 'fake.jpg',
          socket_id: 'fake-socket',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    await expect(
      createMessage.execute({
        text: 'Hello World',
        socket_id: 'fake-socket',
        toId: chat.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new message for inexistent chat', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'fake login',
      email: 'John@doe.com',
      avatar_url: 'John.jpg',
      socket_id: 'socket',
    });

    await expect(
      createMessage.execute({
        text: 'Hello World',
        socket_id: user.socket_id,
        toId: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
