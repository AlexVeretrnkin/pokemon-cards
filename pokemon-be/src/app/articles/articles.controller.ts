import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaPromise, Article } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { ConfigService } from '@nestjs/config';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly config: ConfigService
    ) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  public create(@Body() createPrismaDto: CreateArticleDto ) {
    return this.articlesService.create(createPrismaDto);
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  public findAll() {
    return this.articlesService.findAllArticles();
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  public findDrafts(): PrismaPromise<Article[]> {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  public findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  public update(@Param('id') id: string, @Body() updatePrismaDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updatePrismaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  public remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
