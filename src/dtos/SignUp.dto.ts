import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}