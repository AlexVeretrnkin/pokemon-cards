import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import path from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(path.basename(__dirname), './env/.env')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
