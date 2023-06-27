import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async encrypt(password: string) {
    try {
      const salt = await genSalt(10);
      return await hash(password, salt);
    } catch (error) {
      throw new Error('encripting password failed')
    }
  }

  async verifyPassword(password: string, hash: string) {
    return compare(password, hash);
  }

  async register(registrationData: RegisterDto) {
    try {
      const hashedPassword = await this.encrypt(registrationData.password);
      const { _id, email, name } = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const { password, ...rest } = createUser;
      return { _id, email, name } ;
    } catch (error) {
      throw error;
    }
  }

  async validateUser(loggedUser: LoginDto) {
    try {
      const user = (await this.userService.findByEmail(
        loggedUser.email,
      )) as User;
      if (await this.verifyPassword(loggedUser.password, user.password))
        return {
          accessToken: await this.jwtService.signAsync({ email: user.email }),
        };

      throw new UnauthorizedException();
      // console.log('user correcto');
      //todo generate token
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
