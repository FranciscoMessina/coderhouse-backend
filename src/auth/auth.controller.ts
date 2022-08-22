import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Session } from 'express-session';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LocalGuard } from './guards/local.guard';
import { CookieAuthGuard } from './guards/cookie.guard';
import { LoginDto } from '../users/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @ApiResponse({ type: User })
  async login(@Req() req: Request, @Body() data: LoginDto) {
    return req.user;
  }

  @UseGuards(CookieAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ type: User })
  @Get('me')
  async me(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @ApiResponse({ type: User })
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}

declare module 'express' {
  interface Request {
    session: Session & {
      user?: User;
    };
    user?: User;
  }
}
