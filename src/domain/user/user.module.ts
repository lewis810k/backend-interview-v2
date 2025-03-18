import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserFavorite } from '../../libs/entities/user-favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFavorite]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
