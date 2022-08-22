import { Document, Types } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  // Only here so Swagger knows it exists in returned entities
  @ApiProperty()
  _id: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop()
  @ApiProperty()
  body: string;

  @Prop()
  @ApiProperty()
  type: string;
}

export type MessageType = Message &
  Document<any, any, any> & { _id: Types.ObjectId };

export const MessageSchema = SchemaFactory.createForClass(Message);
