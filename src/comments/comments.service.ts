import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '~/src/comments/comment.repository';
import { CreateCommentRequest } from '~/src/comments/create-comment.request';
import { Comment } from '~/src/comments/comment.entity';
import { User } from '~/src/auth/user.entity';
import { PaginationRequest } from '~/src/common/pagination/pagination.request';
import { PaginationResponse } from '~/src/common/pagination/pagination.response';
import { PaginationBuilder } from '~/src/common/pagination/pagination-builder';
import { ArticlesService } from '~/src/articles/articles.service';
import { UpdateCommentRequest } from '~/src/comments/update-comment-request';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly articleService: ArticlesService,
  ) {}

  async createComment(
    createCommentRequest: CreateCommentRequest,
    user: User,
  ): Promise<Comment> {
    const article = await this.articleService.getArticleById(
      createCommentRequest.articleId,
    );
    return this.commentRepository.createComment(
      createCommentRequest,
      user,
      article,
    );
  }

  async getComments(
    paginationRequest: PaginationRequest,
    user: User,
    articleId: number,
  ): Promise<PaginationResponse<unknown>> {
    const take = paginationRequest.take();
    const [comments, total] = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.userId = :userId', { userId: user.id })
      .where('comment.articleId = :articleId', { articleId: articleId })
      .orderBy('comment.createdAt', 'ASC')
      .take(take)
      .skip(paginationRequest.skip())
      .getManyAndCount();

    return new PaginationBuilder()
      .setData(comments)
      .setPage(paginationRequest.page())
      .setTake(paginationRequest.take())
      .setTotalCount(total)
      .build();
  }

  async getCommentById(id: number): Promise<Comment> {
    const found = this.commentRepository.findOneBy({ id });
    if (!found) throw new NotFoundException();
    return found;
  }

  async updateComment(
    id: number,
    updateCommentRequest: UpdateCommentRequest,
  ): Promise<Comment> {
    const comment = await this.getCommentById(id);
    comment.content = updateCommentRequest.content;

    await this.commentRepository.save(comment);

    return comment;
  }

  async deleteComment(id: number, user: User): Promise<void> {
    const result = await this.commentRepository.delete({ id, user });

    if (result.affected === 0)
      throw new NotFoundException(`article with id ${id} does not exist`);
  }
}
