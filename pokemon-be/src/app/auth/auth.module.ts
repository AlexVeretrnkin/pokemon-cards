import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                await ConfigModule.envVariablesLoaded;

                const secret: string | undefined = configService.get('JWT_SECRET');

                return {
                    global: true,
                    signOptions: { expiresIn: '60s' },
                    secret
                };
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthGuard]
})
export class AuthModule {}
