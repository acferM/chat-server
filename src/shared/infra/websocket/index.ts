import { CreateUserService } from 'src/modules/users/services/CreateUser';
import { container } from 'tsyringe';

import { io } from '../http';

io.on('connect', socket => {
  socket.on('user_signin', async data => {
    const { name, email, avatar_url } = data;

    const createUser = container.resolve(CreateUserService);

    await createUser.execute({
      avatar_url,
      email,
      name,
      socket_id: socket.id,
    });
  });
});
