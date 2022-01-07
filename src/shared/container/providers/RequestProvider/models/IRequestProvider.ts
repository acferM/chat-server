import axios from 'axios';

type RequestResponse<T = any> = {
  data: T;
};

export interface IRequestProvider {
  get<T = any>(url: string): Promise<RequestResponse<T>>;
}
