import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { Allow } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @Allow()
  item: {
    title: string;
    id: string;
    quantity: number;
    price: number;
  };
}
