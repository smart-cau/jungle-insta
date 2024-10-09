import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ArticlesService } from '~/src/articles/articles.service';
import { Article } from '~/src/articles/article.entity';
import { CreateArticleDto } from '~/src/articles/create-article.dto';
import { GetUser } from '~/src/auth/get-user.decorator';
import { User } from '~/src/auth/user.entity';
import { GetPagination } from '~/src/common/pagination/get-pagination.decorator';
import { PaginationRequest } from '~/src/common/pagination/pagination.request';
import { PaginationResponse } from '~/src/common/pagination/pagination.response';
import {
  ApiPaginationRequest,
  ApiPaginationResponse,
} from '~/src/common/pagination/pagination.swagger';

@Controller('articles')
@UseGuards(AuthGuard())
@ApiTags('Articles')
@ApiBearerAuth('accessToken')
@ApiUnauthorizedResponse({ description: '로그인한 유저만 사용 가능함' })
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: '전체 게시물 조회' })
  @ApiPaginationRequest()
  @ApiPaginationResponse(Article)
  @Get()
  getAllArticles(
    @GetPagination() pagination: PaginationRequest,
  ): Promise<PaginationResponse<unknown>> {
    return this.articlesService.getPaginatedList(pagination);
  }

  @ApiCreatedResponse({ description: 'successfully created article' })
  @Post()
  createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return this.articlesService.createArticle(createArticleDto, user);
  }

  @ApiNoContentResponse({ description: 'article is successfully deleted' })
  @Delete(':id')
  deleteArticle(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.articlesService.deleteArticle(id, user);
  }

  @Patch(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articlesService.updateArticle(id, createArticleDto);
  }
}
