import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { Cookie } from '../auth/decorators/cookie/cookie.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  // @ApiBearerAuth('access_token')
  @ApiCookieAuth('access_token')
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    //version cookie
    // async getProfile(@Cookie('access_token') access_token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.findByEmail(
      req.user.email,
    );

    return user;
  }
}
