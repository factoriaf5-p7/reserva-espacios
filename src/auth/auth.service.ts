import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/schemas/user.schema';
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

      const result = await hash(password, salt);

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async verifyPassword(password: string, hash: string) {
    return compare(password, hash);
  }

  async register(registrationData: RegisterDto) {
    try {
      const hashedPassword = await this.encrypt(registrationData.password);
      const createUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = createUser;
      return rest;
    } catch (error) {
      if (error?.name === 'MongoError' && error.code === 11000) {
        throw ConflictException;
      }
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
