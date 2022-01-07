import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { FakeRequestProvider } from '@shared/container/providers/RequestProvider/fakes/FakeRequestProvider';

import { CreateChatService } from '.';
import { FakeChatsRepository } from '../../repositories/fakes/FakeChatsRepository';

let fakeChatsRepository: FakeChatsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRequestProvider: FakeRequestProvider;
let createChat: CreateChatService;

describe('Create Chat Service', () => {
  beforeEach(() => {
    fakeChatsRepository = new FakeChatsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeRequestProvider = new FakeRequestProvider();
    createChat = new CreateChatService(
      fakeChatsRepository,
      fakeUsersRepository,
      fakeRequestProvider,
    );
  });

  it('Should be able to create a new chat', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id',
    });

    await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'john2@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id_2',
    });

    const chat = await createChat.execute({
      emailsUrl: '["john@doe.com", "john2@doe.com"]',
    });

    expect(chat).toHaveProperty('id');
  });

  it('Should not create a new room to same users', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id',
    });

    await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'john2@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id_2',
    });

    const firstChat = await createChat.execute({
      emailsUrl: '["john@doe.com", "john2@doe.com"]',
    });

    const secondChat = await createChat.execute({
      emailsUrl: '["john@doe.com", "john2@doe.com"]',
    });

    expect(firstChat.id).toEqual(secondChat.id);
  });
});
