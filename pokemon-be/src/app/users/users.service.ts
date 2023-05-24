import { Injectable } from '@nestjs/common';
import { PrismaPromise, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDtoApi } from './dto/create-user.dto';
import { UpdateUserDtoApi } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly select: Record<keyof UserEntity, boolean> = {
    email: true,
    id: true,
    name: true,
    surname: true
  };


  /**
   * @deprecated
   */
  async findOne(username: string): Promise<any | undefined> {
    const users = [
      {
        userId: 1,
        username: 'john',
        password: await argon2.hash('guess'),
      },
      {
        userId: 2,
        username: 'maria',
        password: await argon2.hash('guess'),
      },
    ];

    return users.find(user => user.username === username);
  }

  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  public async create(data: CreateUserDtoApi) {
    return this.prisma.user.create({
      data,
      select: this.select
    });
  }

  public findAllUsers(): PrismaPromise<UserEntity[]> {
    return this.prisma.user.findMany({
      select: this.select
    });
  }

  public findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }});
  }

  public findById(id: number) {
    return this.prisma.user.findUnique({ where: { id }});
  }

  public updateRefreshToken(id: number, refreshToken: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        refreshToken
      }
    });
  }

  public update(id: number, updateUserDto: UpdateUserDtoApi): PrismaPromise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      select: this.select,
      data: updateUserDto,
    });
  }

  public remove(id: number) {
    return this.prisma.user.delete({ where: { id }, select: this.select })
  }
}