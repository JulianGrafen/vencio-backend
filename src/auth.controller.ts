import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { MockanzeigenDto } from './dtos/Mockanzeigen.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string; userId:number }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string, userId: number }> {
    const { token, userId } = await this.authService.login(loginDto);
    return { token, userId };
  }
  

  @Post('/registerPartnerAccount') //TODO: Rename to "register Mockanzeigen and add endpoints for every partner page"
  registerPartner(@Body() mockanzeigenDto: MockanzeigenDto): Promise<any> {
    return this.authService.registerPartnerAccount(mockanzeigenDto);
  }

  
}