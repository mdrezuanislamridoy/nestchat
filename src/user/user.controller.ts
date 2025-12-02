import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import type { Request } from 'express';
import { JwtGuard } from '@/lib/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@Req() req: Request) {
    return this.userService.getProfile(req);
  }

  @Get()
  @UseGuards(JwtGuard)
  users() {
    return this.userService.getUsers();
  }
}
