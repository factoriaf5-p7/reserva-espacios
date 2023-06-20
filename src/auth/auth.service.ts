import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async encrypt(password: string): Promise<string> {
    try {
      const salt = await genSalt(10);
      return hash(password, salt);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  passwordVerify(password: string, hash: string) {
    return compare(password, hash);
  }
  async register(user: RegisterDto) {
    try {
      const hashedPassword = await this.encrypt(user.password);
      //   console.log(user, hashedPassword);
      const createUser = await this.userService.create({
        ...user,
        password: hashedPassword,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = createUser;
      return rest;
    } catch (error) {
      if (error?.erno == 1062) {
        throw ConflictException;
      }
    }
    // return 'hello from the auth service';
  }
  async validateUser(loggedUser: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail(loggedUser.email);
      //verificar la password
      if (await this.passwordVerify(loggedUser.password, user.password))
        return {
          accessToken: await this.jwtService.signAsync({
            email: loggedUser.email,
          }), //'esto es un token', //to-do: generación del token
        };

      throw new UnauthorizedException();
    } catch (error) {
      throw error;
    }
  }
}
