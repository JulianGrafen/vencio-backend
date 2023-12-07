import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './dtos/article.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/vencio'), HttpModule],
  controllers: [AppController, ArticleController],
  providers: [AppService,ArticleService],
})
export class AppModule {}
