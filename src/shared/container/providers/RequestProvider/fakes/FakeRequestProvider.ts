import { IRequestProvider } from '../models/IRequestProvider';

class FakeRequestProvider implements IRequestProvider {
  async get(url: string): Promise<{ data: any }> {
    const users = JSON.parse(url);

    return {
      data: users,
    };
  }
}

export { FakeRequestProvider };
