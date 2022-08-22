import { Document, Types } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  // Only here so Swagger knows it exists in returned Products
  @ApiProperty()
  _id: string;

  @Prop({ unique: true })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop(
    raw([
      {
        title: String,
        id: String,
        quantity: Number,
        price: Number,
      },
    ]),
  )
  @ApiProperty()
  items: {
    title: string;
    id: string;
    quantity: number;
    price: number;
  }[];

  @Prop()
  @ApiProperty()
  address: string;
}

export type CartType = Cart & Document<any, any, any> & { _id: Types.ObjectId };

export const CartSchema = SchemaFactory.createForClass(Cart);
