import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Value must be a valid email' })
  email: string;

  @IsString({ message: 'Value must be a string' })
  @MinLength(6, { message: 'Name length must be at least 3 character' })
  password: string;
}
