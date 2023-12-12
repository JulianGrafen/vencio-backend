import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class SignUpDto {

  @IsString()
  @IsNotEmpty()
  @Column({unique: true})
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  @Column({unique: true})
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}