import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, // private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);
    if (!token) throw new Error();
    try {
      // const secret = this.configService.get<string>('JWT_TOKEN');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'mi palabra secreta',
      });
      console.log(payload);
      
      const user = await this.userService.findOneByEmail(payload.email);
      console.log(request.params.id, user.id.toString());
      if (request.params?.id === user.id.toString()) {
        request['user'] = payload;
      } else {
        throw new Error();
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private _extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? []; //Bearer qwñelrkjqweorijqweorij
    return type === 'Bearer' ? token : undefined;
  }
}
