import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from '~/src/common/entities/baseTimeEntity';
import { User } from '~/src/auth/user.entity';
import { Article } from '~/src/articles/article.entity';

@Entity()
export class Comment extends BaseTimeEntity {
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;
}
