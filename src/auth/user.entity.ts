import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseTimeEntity } from '~/src/common/entities/baseTimeEntity';
import { Article } from '~/src/articles/article.entity';
import { Comment } from '~/src/comments/comment.entity';

@Entity()
@Unique(['email'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Article, (article) => article.user, { eager: false })
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user, { eager: false })
  comments: Comment[];
}
