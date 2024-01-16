import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ReceiveArticleDto } from './dtos/ReceiveArticle.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }
  
}
