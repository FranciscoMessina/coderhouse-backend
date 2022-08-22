import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './entities/cart.entity';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  create(createCartDto: CreateCartDto, email: string) {
    const cart = new this.cartModel(createCartDto);
    cart.items = [];
    cart.email = email;
    cart.date = new Date();

    return cart.save();
  }

  findAll() {
    return this.cartModel.find().exec();
  }

  findOne(id: string) {
    return this.cartModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.cartModel.findOne({ email }).exec();
  }

  async addItem(email: string, updateCartDto: UpdateCartDto) {
    const cart = await this.findByEmail(email);

    if (cart.items.find((item) => item.id === updateCartDto.item.id)) {
      cart.items.map((item) => {
        if (item.id === updateCartDto.item.id) {
          item.quantity += updateCartDto.item.quantity;
          return item;
        } else {
          return item;
        }
      });
    } else {
      cart.items.push(updateCartDto.item);
    }
    return cart.save();
  }

  async removeItem(email: string, itemId: string) {
    const cart = await this.findByEmail(email);

    cart.items = cart.items.filter((item) => item.id !== itemId);

    return cart.save();
  }
}
