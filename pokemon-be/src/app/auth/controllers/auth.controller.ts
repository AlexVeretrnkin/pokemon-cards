import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { Request as Req } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
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