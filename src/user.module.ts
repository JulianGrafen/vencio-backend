import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class usersModule {}
