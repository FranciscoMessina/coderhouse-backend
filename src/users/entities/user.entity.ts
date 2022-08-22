import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  // Only here so Swagger knows it exists in returned Products
  @ApiProperty()
  _id: string;

  @Prop()
  @ApiProperty()
  fullName: string;

  @Prop({ unique: true })
  @ApiProperty()
  email: string;

  @Prop({ unique: true })
  @ApiProperty()
  phone: string;

  @Prop()
  password: string;
}

export type UserType = User & Document<any, any, any> & { _id: Types.ObjectId };

export const UserSchema = SchemaFactory.createForClass(User);
