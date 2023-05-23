import { Injectable } from '@nestjs/common';
import { PrismaPromise, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDtoApi } from './dto/create-user.dto';
import { UpdateUserDtoApi } from './dto/update-user.dto';

@Injectable()
export class UsersService {

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

  public create(data: CreateUserDtoApi) {
    return this.prisma.user.create({ data });
  }

  public findAllUsers(): PrismaPromise<User[]> {
    return this.prisma.user.findMany();
  }

  public findJustOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public update(id: number, updateUserDto: UpdateUserDtoApi) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  public remove(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }
}