import { FakeRequestProvider } from '@shared/container/providers/RequestProvider/fakes/FakeRequestProvider';

import { GetUsersByEmailsService } from '.';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeRequestProvider: FakeRequestProvider;
let getUsersByEmails: GetUsersByEmailsService;

describe('Get Users by Emails Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRequestProvider = new FakeRequestProvider();
    getUsersByEmails = new GetUsersByEmailsService(
      fakeUsersRepository,
      fakeRequestProvider,
    );
  });

  it('should be able to get users by emails', async () => {
    fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id',
    });

    fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'john2@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id_2',
    });

    const users = await getUsersByEmails.execute(
      '[{"email": "john@doe.com"},{"email": "john2@doe.com"}]',
    );

    expect(users).toHaveLength(2);
  });

  it('should not to get users without email specified', async () => {
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

    const users = await getUsersByEmails.execute('[{"email": "john@doe.com"}]');

    expect(users).toHaveLength(1);
  });
});
