import { Allow, IsEmail } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  buyerEmail: string;

  @Allow()
  items: { title: string; id: string; quantity: number; price: number }[];
}
