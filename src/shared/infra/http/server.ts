import 'reflect-metadata';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);

app.use(express.json());

const io = new Server(server);

io.on('connection', socket => console.log('Connection in socket: ', socket.id));

server.listen(3333, () => console.log('Sever started on port 3333'));

export { io };
