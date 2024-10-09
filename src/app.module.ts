import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '~/src/configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), ArticlesModule],
})
export class AppModule {}
