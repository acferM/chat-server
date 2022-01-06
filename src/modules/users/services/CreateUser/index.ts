import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  avatar_url: string;
  socket_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    socket_id,
    avatar_url,
  }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      const user = await this.usersRepository.updateUserSocketId({
        id: userExists.id,
        socket_id,
      });

      return user;
    }

    const user = await this.usersRepository.create({
      name,
      email,
      socket_id,
      avatar_url,
    });

    return user;
  }
}

export { CreateUserService };
