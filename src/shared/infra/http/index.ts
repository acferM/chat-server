import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { routes } from './routes';

import '../../container';

const app = express();

app.use(cors());

const server = createServer(app);

app.use(express.json());

app.use(routes);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => console.log('Connection in socket: ', socket.id));

export { io, server };
