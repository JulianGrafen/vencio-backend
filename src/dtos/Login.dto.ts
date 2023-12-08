import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsString()
  password: string;
}