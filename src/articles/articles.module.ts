import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleRepository } from '~/src/articles/article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '~/src/articles/article.entity';
import { AuthModule } from '~/src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), AuthModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleRepository],
  exports: [ArticlesService],
})
export class ArticlesModule {}
