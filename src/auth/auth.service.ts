import { PrismaService } from '@/lib/prisma/prisma.service';
import { LoginDto } from '@/user/dto/login.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(userData: LoginDto) {
    console.log(userData);
    const user = await this.prismaService.client.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('');
    }

    const isPassValid = await bcrypt.compare(userData.password, user.password);

    if (!isPassValid) {
      throw new ForbiddenException('invalid password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    const token = this.generateToken(user);

    return {
      message: 'User logged in',
      user: result,
      token,
    };
  }

  generateToken(user: User) {
    return this.jwtService.sign(
      { id: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '2h',
      },
    );
  }
}
