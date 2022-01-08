import axios from 'axios';

import { IRequestProvider } from '../models/IRequestProvider';

class AxiosRequestProvider implements IRequestProvider {
  async get<T = any>(url: string): Promise<{ data: T }> {
    const response = await axios.get<T>(url);

    return response;
  }
}

export { AxiosRequestProvider };
