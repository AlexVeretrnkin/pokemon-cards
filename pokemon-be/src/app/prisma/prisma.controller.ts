import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePrismaArticleDto } from './dto/create-prisma.dto';
import { UpdatePrismaDto } from './dto/update-prisma.dto';
import { PrismaPromise, Article } from '@prisma/client';
@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  create(@Body() createPrismaDto: CreatePrismaArticleDto) {
    return this.prismaService.create(createPrismaDto);
  }

  @Get()
  findAll() {
    return this.prismaService.findAllArticles();
  }

  @Get('drafts')
  public findDrafts(): PrismaPromise<Article[]> {
    return this.prismaService.findDrafts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prismaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrismaDto: UpdatePrismaDto) {
    return this.prismaService.update(+id, updatePrismaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prismaService.remove(+id);
  }
}
