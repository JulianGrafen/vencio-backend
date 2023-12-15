import { ConflictException, Injectable, UnauthorizedException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { MockanzeigenDto } from './dtos/Mockanzeigen.dto';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { response } from 'express';


@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private httpService: HttpService

  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; userId:number}> {
    const { name, email, password, mockAnzeigenPassword, mockAnzeigenEmail } = signUpDto;
    const existingUser = await this.usersRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      mockAnzeigenPassword,
      mockAnzeigenEmail
    });

    await this.usersRepository.save(user);
    const token = this.jwtService.sign({ id: user.id });
    return { token, userId: user.id };
  }




  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { name, password } = loginDto;
    const user = await this.usersRepository.findOne({
      where: { name }, // Update to use the 'name' field for login
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({ id: user.id });
    return { token };
  }

  async registerPartnerAccount(mockanzeigenDto:MockanzeigenDto):Promise<AxiosResponse<any>>{
    const { email, id, password } =  mockanzeigenDto;


    const mockanzeigenApiUrl = "http://localhost:5050/auth/signup"


    const requestData = {
      name: mockanzeigenDto.name, 
      email: mockanzeigenDto.email,
      password: mockanzeigenDto.password,
    };
      try {
        const response: AxiosResponse<any> = await this.httpService.post(mockanzeigenApiUrl, requestData).toPromise();
        const user = await this.usersRepository.findOne({ where: {id} });

          const hashedPassword = await bcrypt.hash(password, 10);
          console.log(mockanzeigenDto);
          await this.usersRepository.update(user, {
            mockAnzeigenEmail: email,
            mockAnzeigenPassword: hashedPassword
          });
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          throw new ConflictException('USER ALREADY EXISTS');
        }
        throw error;
      }
}
}
