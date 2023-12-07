import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class CatsModule {}
