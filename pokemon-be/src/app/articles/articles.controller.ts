import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaPromise, Article } from '@prisma/client';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  public create(@Body() createPrismaDto:CreateArticleDto ) {
    return this.articlesService.create(createPrismaDto);
  }

  @Get()
  public findAll() {
    return this.articlesService.findAllArticles();
  }

  @Get('drafts')
  public findDrafts(): PrismaPromise<Article[]> {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updatePrismaDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updatePrismaDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
