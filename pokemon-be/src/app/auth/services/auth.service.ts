import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import { UsersService } from '../../users/users.service';
import { AuthEntity } from '../entity/auth.entity';
import { User } from '@prisma/client';
import { CreateUserDtoApi } from '../../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    ) {}

  public async signIn(email: string, pass: string): Promise<AuthEntity> {
    const user: User | null = await this.usersService.findByEmail(email);

    if (user) {
      const correctPassword: boolean = await argon2.verify(user.password, pass);

      if (!correctPassword) throw new UnauthorizedException();

      const tokens: AuthEntity = await this.getTokens(user.id, user.email);
      this.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens
    }

    throw new NotFoundException();
  }

  public async signUp(user: CreateUserDtoApi) {
    const newUser:  CreateUserDtoApi = {
      ...user,
      password: await argon2.hash(user.password)
    }


    return this.usersService.create(newUser);
  }

  public async refreshTokens(userId: number, refreshToken: string) {
    const user: User | null = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
 
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    
    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }

  private async getTokens(userId: number, email: string): Promise<AuthEntity> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '30s',
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '60s',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}