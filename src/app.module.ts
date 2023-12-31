import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { ArticleModule } from './article.module';
import { APP_FILTER } from '@nestjs/core';
import { ConflictExceptionFilter } from './exception.filter';



@Module({
  imports: [ ConfigModule.forRoot({

    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
    }),
  }), HttpModule, DatabaseModule,UsersModule,AuthModule, ArticleModule],
  controllers: [AppController],
  providers: [    {
    provide: APP_FILTER,
    useClass: ConflictExceptionFilter,
  },AppService],
})

export class AppModule {}
