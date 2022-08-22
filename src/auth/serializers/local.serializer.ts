import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user._id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const { password, ...user } = await this.usersService.findById(userId);

    done(null, user);
  }
}
