/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Rank, Score, User } from './entities/user.entity';
import { ApiController } from './controllers/ApiController.controller';
import { UserService } from './services/user.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [() => {
        return process.env;
      }],

    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      port: 3306,
      password: 'root@mysql',
      database: 'LearnSignLanguage',
      entities: [User,Score,Rank,],
      synchronize: false,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User,Score,Rank,]),
    JwtModule.register({
      secret: (() => {
        const secretKey = process.env.JWT_SECRET || 'myStrongSecret';
        return secretKey;
      })(),
      signOptions: { expiresIn: '1d' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '/frontend/ReactCV', 'build'),
    }),
  ],
  controllers: [AppController,ApiController  ],
  providers: [AppService,UserService],
})
export class AppModule { }
