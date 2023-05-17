import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaPromise, Article } from '@prisma/client';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  public create(data: CreateArticleDto) {
    return this.prisma.article.create({ data });
  }

  public findAllArticles(): PrismaPromise<Article[]> {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  public findDrafts(): PrismaPromise<Article[]> {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  public findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  public update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  public remove(id: number) {
    return this.prisma.article.delete({ where: { id } })
  }
}
