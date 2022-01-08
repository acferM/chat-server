import { Get15MessagesService } from '@modules/messages/services/Get15Messages';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MessagesByChatController {
  async index(request: Request, response: Response): Promise<Response> {
    const { chat_id } = request.params;
    const { page } = request.query;

    const get15Messages = container.resolve(Get15MessagesService);

    const messages = await get15Messages.execute({
      chat_id,
      page: Number(page),
    });

    return response.json(messages);
  }
}

export { MessagesByChatController };
