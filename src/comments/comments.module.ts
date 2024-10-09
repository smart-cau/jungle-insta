import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentRepository } from '~/src/comments/comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '~/src/comments/comment.entity';
import { ArticlesModule } from '~/src/articles/articles.module';
import { AuthModule } from '~/src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule, ArticlesModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository],
})
export class CommentsModule {}
