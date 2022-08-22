import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { CookieAuthGuard } from '../auth/guards/cookie.guard';
import { Request } from 'express';
import { RemoveItemDto } from './dto/remove-item.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(CookieAuthGuard)
  create(@Body() createCartDto: CreateCartDto, @Req() req: Request) {
    return this.cartService.create(createCartDto, req.user.email);
  }

  @Get(':email')
  @UseGuards(CookieAuthGuard)
  findOne(@Param('email') email: string) {
    return this.cartService.findByEmail(email);
  }

  @Patch(':email')
  @UseGuards(CookieAuthGuard)
  update(@Param('email') email: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.addItem(email, updateCartDto);
  }

  @Delete(':email')
  @UseGuards(CookieAuthGuard)
  remove(@Param('email') email: string, @Body() data: RemoveItemDto) {
    return this.cartService.removeItem(email, data.itemId);
  }
}
