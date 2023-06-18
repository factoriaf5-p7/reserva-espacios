import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: RegisterDto) {
    console.log(user);
    return this.authService.register(user);
  }
  //versión solo token
  // @Post('signin')
  // async signin(@Body() user: LoginDto) {
  //   return this.authService.validateUser(user);
  // }
  //versión cookie httpOnly
  @Post('signin')
  async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.validateUser(
      req.body as LoginDto,
    );
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
      })
      .send({ status: 'ok' });
  }
}
