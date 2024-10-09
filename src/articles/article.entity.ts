import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseTimeEntity } from '~/src/common/entities/baseTimeEntity';
import { User } from '~/src/auth/user.entity';
import { Comment } from '~/src/comments/comment.entity';

@Entity()
export class Article extends BaseTimeEntity {
  @Column({ type: 'text' })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.articles, {
    onDelete: 'CASCADE',
    eager: true,
    createForeignKeyConstraints: false,
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
