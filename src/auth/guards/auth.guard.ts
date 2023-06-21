import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);
    if (!token) throw new Error();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'mi palabra secreta',
      });
      // const user = await this.userService.findOneByEmail(payload.email);
      // if (request.params('id') === user.id) {
      request['user'] = payload;
      // } else {
      //   throw new Error();
      // }
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private _extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' '); //Bearer qwñelrkjqweorijqweorij
    if (type === 'Bearer') {
      return token;
    } else {
      return undefined;
    }
  }
}
