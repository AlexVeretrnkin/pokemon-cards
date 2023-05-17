import { INestApplication, Injectable } from '@nestjs/common';
import { CreatePrismaArticleDto } from './dto/create-prisma.dto';
import { UpdatePrismaDto } from './dto/update-prisma.dto';
import { PrismaClient, PrismaPromise, Article } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  public async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
