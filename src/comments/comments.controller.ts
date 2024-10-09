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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentsService } from '~/src/comments/comments.service';
import {
  ApiPaginationRequest,
  ApiPaginationResponse,
} from '~/src/common/pagination/pagination.swagger';
import { Comment } from '~/src/comments/comment.entity';
import { GetPagination } from '~/src/common/pagination/get-pagination.decorator';
import { PaginationRequest } from '~/src/common/pagination/pagination.request';
import { PaginationResponse } from '~/src/common/pagination/pagination.response';
import { GetUser } from '~/src/auth/get-user.decorator';
import { User } from '~/src/auth/user.entity';
import { CreateCommentRequest } from '~/src/comments/create-comment.request';
import { UpdateCommentRequest } from '~/src/comments/update-comment-request';

@ApiTags('Comments')
@ApiBearerAuth('accessToken')
@ApiUnauthorizedResponse({ description: '로그인한 유저만 사용 가능함' })
@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({ description: 'successfully created article' })
  @Post()
  createComment(
    @Body() createCommentRequest: CreateCommentRequest,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.createComment(createCommentRequest, user);
  }

  @ApiPaginationRequest()
  @ApiPaginationResponse(Comment)
  @Get(':articleId')
  getCommentsByArticle(
    @GetPagination() paginationRequest: PaginationRequest,
    @GetUser() user: User,
    @Param('articleId') articleId: number,
  ): Promise<PaginationResponse<unknown>> {
    return this.commentsService.getComments(paginationRequest, user, articleId);
  }

  @Patch(':id')
  updateComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() updateCommentRequest: UpdateCommentRequest,
  ): Promise<Comment> {
    return this.commentsService.updateComment(commentId, updateCommentRequest);
  }

  @Delete(':id')
  deleteComment(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) commentId: number,
  ): Promise<void> {
    return this.commentsService.deleteComment(commentId, user);
  }
}
