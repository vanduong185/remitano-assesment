import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { UsersProvider } from './users.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...UsersProvider],
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
