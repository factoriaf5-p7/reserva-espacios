import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get(':id/profile')
  async getProfile(@Req() req, @Param('id') id: string) {
    return this.userService.findOneById(+id, req.user);
  }
}
