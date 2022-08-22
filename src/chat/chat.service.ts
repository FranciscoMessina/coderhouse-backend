import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async handleClientMessage(
    client: Socket,
    data: { body: string; email: string },
  ) {
    const message = new this.messageModel({ ...data, type: 'user' });

    await message.save();

    client.emit('success', { id: message.id });
  }

  async handleAdminMessage(
    client: Socket,
    data: { target: string; body: string },
    server: Server,
  ) {
    const message = new this.messageModel({ ...data, type: 'admin' });

    await message.save();

    console.log(data);

    server.to(data.target).emit('admin-message', { body: message.body });
  }
}
