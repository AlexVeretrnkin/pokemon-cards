import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(configService: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: configService.get('JWT_REFRESH_SECRET'),
          passReqToCallback: true,
        });
      }
    
    public validate<T extends object>(req: Request, payload: T): T & { refreshToken: string | undefined } {
        const refreshToken = req.get('Authorization')?.replace('Bearer', '')?.trim();
        return { ...payload, refreshToken };
      }
}
