import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from '~/src/articles/article.repository';
import { Article } from '~/src/articles/article.entity';
import { CreateArticleDto } from '~/src/articles/create-article.dto';
import { User } from '~/src/auth/user.entity';
import { PaginationRequest } from '~/src/common/pagination/pagination.request';
import { PaginationBuilder } from '~/src/common/pagination/pagination-builder';
import { PaginationResponse } from '~/src/common/pagination/pagination.response';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async getPaginatedList(
    paginationReq: PaginationRequest,
  ): Promise<PaginationResponse<unknown>> {
    const take = paginationReq.take();
    const [articles, total] = await this.articleRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take,
      skip: paginationReq.skip(),
    });

    return new PaginationBuilder()
      .setData(articles)
      .setPage(paginationReq.page())
      .setTake(paginationReq.take())
      .setTotalCount(total)
      .build();
  }

  async getArticleById(id: number): Promise<Article> {
    const found = this.articleRepository.findOneBy({ id });
    if (!found) throw new NotFoundException();
    return found;
  }

  async createArticle(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    return this.articleRepository.createArticle(createArticleDto, user);
  }

  async deleteArticle(id: number, user: User): Promise<void> {
    const result = await this.articleRepository.delete({ id, user });

    if (result.affected === 0)
      throw new NotFoundException(`article with id ${id} does not exist`);
  }

  async updateArticle(
    id: number,
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    const article = await this.getArticleById(id);
    article.title = createArticleDto.title;
    article.content = createArticleDto.content;

    await this.articleRepository.save(article);

    return article;
  }
}
