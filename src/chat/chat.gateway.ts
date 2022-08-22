import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]): any {
    console.log(`${client.id} connected`);
  }

  handleDisconnect(client: any): any {
    console.log(`${client.id} disconected`);
  }

  @SubscribeMessage('message')
  async handleTest(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.handleClientMessage(client, JSON.parse(data));
  }

  @SubscribeMessage('admin-message')
  async handleAdminMessage(
    @MessageBody()
    data: any,
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.handleAdminMessage(
      client,
      JSON.parse(data),
      this.server,
    );
  }
}
