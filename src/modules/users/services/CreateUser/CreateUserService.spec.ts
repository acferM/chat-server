import { CreateUserService } from '.';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let createUsers: CreateUserService;

describe('Create User Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUsers = new CreateUserService(fakeUsersRepository);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUsers.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      avatar_url: 'john avatar',
      socket_id: 'socket',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should update user socket_id if user already exists', async () => {
    const oldUser = await createUsers.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      avatar_url: 'john avatar',
      socket_id: 'socket',
    });

    const user = await createUsers.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      avatar_url: 'john avatar',
      socket_id: 'new_socket',
    });

    expect(oldUser.id).toEqual(user.id);
    expect(user.socket_id).toEqual('new_socket');
  });
});
