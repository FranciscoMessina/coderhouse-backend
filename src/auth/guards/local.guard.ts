import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorized = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();

    if (authorized) {
      await super.logIn(request);
    }

    return authorized;
  }
}
