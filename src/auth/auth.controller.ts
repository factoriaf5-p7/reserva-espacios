import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }
  @Post('signin')
  /* 1. response json con el token */

  async signin(@Body() user: LoginDto) {
  return this.authService.validateUser(user);
  }
  /* 2. response con cookie */
  // async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   const { accessToken } = await this.authService.validateUser(req.body);
  //   res
  //     .cookie('access_token', accessToken, {
  //       httpOnly: true,
  //       secure: false,
  //       sameSite: 'lax',
  //       // expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
  //     })
  //     .status(200)
  //     .send({ status: 'ok' });
  // }
}

