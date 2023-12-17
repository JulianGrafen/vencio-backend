import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import Listing from './listing.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Listing]),
  HttpModule.register({}), ],
  controllers: [ArticleController],
  providers: [ArticleService, HttpModule],
})
export class ArticleModule {}
