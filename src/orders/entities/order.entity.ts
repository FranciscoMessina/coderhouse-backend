import { Document, Types } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  // Only here so Swagger knows it exists in returned Products
  @ApiProperty()
  _id: string;

  @Prop({ default: 'created' })
  @ApiProperty()
  status: string;

  @Prop()
  @ApiProperty()
  orderNumber: number;

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

  @Prop({ default: new Date() })
  @ApiProperty()
  date: Date;

  @Prop()
  @ApiProperty()
  buyerEmail: string;
}

export type OrderType = Order &
  Document<any, any, any> & { _id: Types.ObjectId };

export const OrderSchema = SchemaFactory.createForClass(Order);
