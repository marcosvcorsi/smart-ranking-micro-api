import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  controllers: [CategoriesController]
})
export class CategoriesModule {}
