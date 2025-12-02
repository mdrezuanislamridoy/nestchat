import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtGuard } from '@/lib/guards/auth.guard';
import { JwtStrategy } from '@/user/strategies/JwtStrategy';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, JwtGuard, JwtStrategy],
})
export class UserModule {}
