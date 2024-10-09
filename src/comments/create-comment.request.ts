import { IsNotEmpty } from 'class-validator';

export class CreateCommentRequest {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  articleId: number;
}
