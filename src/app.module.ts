import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '~/src/configs/typeorm.config';
import { AuthModule } from '~/src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), ArticlesModule, AuthModule],
})
export class AppModule {}
