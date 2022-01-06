import 'reflect-metadata';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);

app.use(express.json());

const io = new Server(server);

io.on('connection', socket => console.log('Connection in socket: ', socket.id));

export { io, server };
