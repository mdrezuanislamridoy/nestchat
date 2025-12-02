import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Value must be a string' })
  @MinLength(3, { message: 'Name length must be at least 3 character' })
  name: string;

  @IsEmail({}, { message: 'Value must be a valid email' })
  email: string;

  @IsString({ message: 'Value must be a string' })
  @MinLength(6, { message: 'Name length must be at least 3 character' })
  password: string;
}
