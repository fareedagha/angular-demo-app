import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
export class SocketioService {

     socket: any;

    constructor() { }

    setupSocketConnection() {
        this.socket = io(environment.SOCKET_ENDPOINT);
    }
}