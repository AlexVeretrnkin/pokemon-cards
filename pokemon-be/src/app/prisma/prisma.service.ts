import { INestApplication, Injectable } from '@nestjs/common';
import { CreatePrismaArticleDto } from './dto/create-prisma.dto';
import { UpdatePrismaDto } from './dto/update-prisma.dto';
import { PrismaClient, PrismaPromise, Article } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  create(createPrismaDto: CreatePrismaArticleDto) {
    return 'This action adds a new prisma';
  }

  public findAllArticles(): PrismaPromise<Article[]> {
    return this.article.findMany({ where: { published: true } });
  }

  public findDrafts(): PrismaPromise<Article[]> {
    return this.article.findMany({ where: { published: false } });
  }

  public findOne(id: number) {
    return this.article.findUnique({ where: { id } });
  }

  update(id: number, updatePrismaDto: UpdatePrismaDto) {
    return `This action updates a #${id} prisma`;
  }

  remove(id: number) {
    return `This action removes a #${id} prisma`;
  }

  public async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
