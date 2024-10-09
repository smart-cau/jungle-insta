import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from '~/src/comments/comment.entity';
import { CreateCommentRequest } from '~/src/comments/create-comment.request';
import { User } from '~/src/auth/user.entity';
import { Article } from '~/src/articles/article.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async createComment(
    createCommentRequest: CreateCommentRequest,
    user: User,
    article: Article,
  ): Promise<Comment> {
    const comment = this.create({
      ...createCommentRequest,
      user,
      article,
    });

    await this.save(comment);

    return comment;
  }
}
