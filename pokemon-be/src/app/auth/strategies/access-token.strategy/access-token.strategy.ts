import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@pokemon-cards/shared/models';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
constructor(
    configService: ConfigService
) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  public validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}