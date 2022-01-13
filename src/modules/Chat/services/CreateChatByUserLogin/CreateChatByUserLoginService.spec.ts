import { FakeChatsRepository } from '@modules/Chat/repositories/fakes/FakeChatsRepository';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateChatByUserLoginService } from '.';

let fakeChatsRepository: FakeChatsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createChatByUserLogin: CreateChatByUserLoginService;

describe('Create Chat By User Login', () => {
  beforeEach(() => {
    fakeChatsRepository = new FakeChatsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createChatByUserLogin = new CreateChatByUserLoginService(
      fakeChatsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new chat', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      email: 'john@doe.com',
      avatar_url: 'avatar',
      socket_id: 'socket_id1',
    });

    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe2',
      email: 'john@doe.com',
      avatar_url: 'avatar',
      socket_id: 'socket_id2',
    });

    const chat = await createChatByUserLogin.execute({
      login: 'johndoe2',
      socket_id: 'socket_id1',
    });

    expect(chat).toHaveProperty('id');
  });

  it('should not create a new chat if it already exists', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      email: 'john@doe.com',
      avatar_url: 'avatar',
      socket_id: 'socket_id1',
    });

    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe2',
      email: 'john@doe.com',
      avatar_url: 'avatar',
      socket_id: 'socket_id2',
    });

    const old_chat = await createChatByUserLogin.execute({
      login: 'johndoe2',
      socket_id: 'socket_id1',
    });

    const chat = await createChatByUserLogin.execute({
      login: 'johndoe',
      socket_id: 'socket_id2',
    });

    expect(old_chat.id).toEqual(chat.id);
  });

  it('should not be able to create a new chat with inexistent socket_id', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe2',
      email: 'john@doe.com',
      avatar_url: 'avatar',
      socket_id: 'socket_id2',
    });

    await expect(
      createChatByUserLogin.execute({
        login: 'johndoe2',
        socket_id: 'socket_id1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new chat with inexistent login', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      email: 'john@doe.com',
      avatar_url: 'avatar',
      socket_id: 'socket_id1',
    });

    await expect(
      createChatByUserLogin.execute({
        login: 'johndoe2',
        socket_id: 'socket_id1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
