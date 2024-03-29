import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
  });
  await app.listen(5000);
}
bootstrap();

