import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get(':id/profile')
  async getProfile(@Req() req, @Param() id: number) {
    return this.userService.findOneByEmail(req.user.email);
  }
}
