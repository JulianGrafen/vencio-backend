import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {

  @IsString()
  name: string;

  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsString()
  password: string;
}