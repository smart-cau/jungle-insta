import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Article } from '~/src/articles/article.entity';
import { CreateArticleDto } from '~/src/articles/create-article.dto';
import { User } from '~/src/auth/user.entity';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private readonly dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async createArticle(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    const article = this.create({
      ...createArticleDto,
      user,
    });

    await this.save(article);

    return article;
  }
}
