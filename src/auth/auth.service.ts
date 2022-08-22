import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async register(data: RegisterDto) {
    const password = await bcrypt.hash(data.password, 10);

    try {
      const user = await this.userService.create({ ...data, password });

      return user;
    } catch (e) {
      console.log(e);
      if (e?.code === 11000) {
        throw new BadRequestException('Account already exists');
      }
    }
  }
}
