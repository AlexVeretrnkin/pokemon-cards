import { Injectable } from '@nestjs/common';
import { PrismaPromise, Article } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {

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

  public create(data: any) {
    return this.prisma.article.create({ data });
  }

  public findAllArticles(): PrismaPromise<Article[]> {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  public findDrafts(): PrismaPromise<Article[]> {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  public findJustOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  public update(id: number, updateArticleDto: any) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  public remove(id: number) {
    return this.prisma.article.delete({ where: { id } })
  }
}