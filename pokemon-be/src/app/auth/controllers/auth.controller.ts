import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { Request as Req } from 'express';
import { CreateUserDtoApi } from '../../users/dto/create-user.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('singin')
  public signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('singup')
  public signUp(@Body() user: CreateUserDtoApi) {
    return this.authService.signUp(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  public refresh(@Request() req: any) {
    return this.authService.refreshTokens(req.user['userId'], req.user['refreshToken']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Request() req: Express.Request) {
    console.log(req.user);
    console.log(req.authInfo);

    return req.user;
  }
}