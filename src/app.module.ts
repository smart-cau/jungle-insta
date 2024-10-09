import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '~/src/configs/typeorm.config';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ArticlesModule,
    CommentsModule,
  ],
})
export class AppModule {}
