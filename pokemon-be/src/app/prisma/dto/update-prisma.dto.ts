import { PartialType } from '@nestjs/mapped-types';
import { CreatePrismaArticleDto } from './create-prisma.dto';

export class UpdatePrismaDto extends PartialType(CreatePrismaArticleDto) {}
