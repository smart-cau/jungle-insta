import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CommonEntity } from '~/src/entities/common.entity';

@Entity()
@Unique(['email'])
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
