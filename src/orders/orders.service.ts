import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { MailService } from '../common/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private mailService: MailService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = new this.orderModel(createOrderDto);

    await this.mailService.sendMail({
      to: createOrderDto.buyerEmail,
      text: `Thank you for your order ${JSON.stringify(order)}`,
    });

    await this.mailService.sendMail({
      to: process.env['ADMIN_MAIL'],
      text: `Order created: ${JSON.stringify(order)}`,
    });

    return order.save();
  }

  findAll() {
    return this.orderModel.find().exec();
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
