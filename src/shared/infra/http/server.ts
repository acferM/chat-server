import { server } from './index';
import '../websocket';

server.listen(3333, () => console.log('Sever started on port 3333'));
