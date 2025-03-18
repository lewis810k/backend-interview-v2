import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';
import { User } from './libs/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './domain/product/product.module';
import { Product } from './libs/entities/product.entity';
import { UserFavorite } from './libs/entities/user-favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydatabase',
      entities: [User, Product, UserFavorite],
      synchronize: false,
      logging: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
