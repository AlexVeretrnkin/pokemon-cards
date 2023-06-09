import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/access-token.strategy/refresh-token.strategy';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthGuard]
})
export class AuthModule {}
