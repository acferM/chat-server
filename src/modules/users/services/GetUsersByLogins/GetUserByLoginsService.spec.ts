import { FakeRequestProvider } from '@shared/container/providers/RequestProvider/fakes/FakeRequestProvider';

import { GetUsersByLoginsService } from '.';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeRequestProvider: FakeRequestProvider;
let getUsersByEmails: GetUsersByLoginsService;

describe('Get Users by Logins Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRequestProvider = new FakeRequestProvider();
    getUsersByEmails = new GetUsersByLoginsService(
      fakeUsersRepository,
      fakeRequestProvider,
    );
  });

  it('should be able to get users by logins', async () => {
    fakeUsersRepository.create({
      name: 'John Doe',
      login: 'fake login1',
      email: 'john@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id',
    });

    fakeUsersRepository.create({
      name: 'John Doe 2',
      login: 'fake login2',
      email: 'john2@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id_2',
    });

    const users = await getUsersByEmails.execute(
      '[{"login": "fake login1"},{"login": "fake login2"}]',
    );

    expect(users).toHaveLength(2);
  });

  it('should not to get users without login specified', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'fake login1',
      email: 'john@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id',
    });

    await fakeUsersRepository.create({
      name: 'John Doe 2',
      login: 'fake login2',
      email: 'john2@doe.com',
      avatar_url: 'fake_avatar',
      socket_id: 'fake_socket_id_2',
    });

    const users = await getUsersByEmails.execute('[{"login": "fake login1"}]');

    expect(users).toHaveLength(1);
  });
});
