import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  // Only here so Swagger knows it exists in returned Products
  @ApiProperty()
  _id: string;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  price: number;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  image: string;

  @Prop()
  @ApiProperty()
  category: string;
}

export type ProductType = Product &
  Document<any, any, any> & { _id: Types.ObjectId };

export const ProductSchema = SchemaFactory.createForClass(Product);
