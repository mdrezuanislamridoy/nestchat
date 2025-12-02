import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto) {
    const isUser = await this.prisma.client.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (isUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPass = await bcrypt.hash(userData.password, 10);

    const user = await this.prisma.client.user.create({
      data: {
        ...userData,
        password: hashedPass,
      },
    });

    return user;
  }

  getProfile(req: Request) {
    return {
      user: req.user,
    };
  }

  async getUsers() {
    return await this.prisma.client.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
