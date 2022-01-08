import { FakeChatsRepository } from '@modules/Chat/repositories/fakes/FakeChatsRepository';
import { FakeMessagesRepository } from '@modules/messages/repositories/fakes/FakeMessagesRepository';

import { AppError } from '@shared/errors/AppError';

import { Get15MessagesService } from '.';

let fakeMessagesRepository: FakeMessagesRepository;
let fakeChatsRepository: FakeChatsRepository;
let get15Messages: Get15MessagesService;

describe('Get 15 Messages Service', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();
    fakeChatsRepository = new FakeChatsRepository();
    get15Messages = new Get15MessagesService(
      fakeMessagesRepository,
      fakeChatsRepository,
    );
  });

  it('should be able to list 15 messages', async () => {
    const chat = await fakeChatsRepository.create({
      users: [],
    });

    const messagesToCreate = [
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
    ];

    messagesToCreate.forEach(async message => {
      await fakeMessagesRepository.create(message);
    });

    const messages = await get15Messages.execute({
      chat_id: chat.id,
      page: 1,
    });

    expect(messages).toHaveLength(15);
  });

  it('should be able to list rest of message starting at 15 messages', async () => {
    const chat = await fakeChatsRepository.create({
      users: [],
    });

    const messagesToCreate = [
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message-16', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
      { text: 'fake-message', fromId: 'fake-user-id', toId: chat.id },
    ];

    messagesToCreate.forEach(async message => {
      await fakeMessagesRepository.create(message);
    });

    const messages = await get15Messages.execute({
      chat_id: chat.id,
      page: 2,
    });

    expect(messages).toHaveLength(5);
    expect(messages[0].text).toBe('fake-message-16');
  });

  it('should not be able to list messages from inexistent chat', async () => {
    const chat = await fakeChatsRepository.create({
      users: [],
    });

    await fakeMessagesRepository.create({
      text: 'fake-message',
      fromId: 'fake-user-id',
      toId: chat.id,
    });

    await expect(
      get15Messages.execute({
        chat_id: 'fake-chat',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
