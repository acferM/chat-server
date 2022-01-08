import { container } from 'tsyringe';

import { AxiosRequestProvider } from './implementations/AxiosRequestProvider';
import { IRequestProvider } from './models/IRequestProvider';

container.registerSingleton<IRequestProvider>(
  'RequestProvider',
  AxiosRequestProvider,
);
