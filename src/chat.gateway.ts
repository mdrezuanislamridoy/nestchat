import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(9090, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  users = new Map<string, string>();

  @SubscribeMessage('register')
  registerUser(client: Socket, userId: string) {
    this.users.set(userId, client.id);
    console.log(client.id, userId);
    console.log(this.users);
  }

  @SubscribeMessage('send-message')
  sendMessage(
    @MessageBody()
    data: {
      senderId: string;
      recieverId: string;
      message: string;
    },
  ) {
    const recieverSocket = this.users.get(data.recieverId);

    console.log(data);

    console.log(recieverSocket);

    if (recieverSocket) {
      this.server.to(recieverSocket).emit('receive-message', data);
    }
  }
}
