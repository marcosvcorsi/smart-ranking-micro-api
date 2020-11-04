import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from 'src/controllers/categories.controller';
import { Category, CategorySchema } from 'src/models/category.schema';
import { CategoriesRepository } from 'src/repositories/categories.repository';
import { CategoriesService } from 'src/services/categories.service';
import { PlayersModule } from './players.module';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      },
    ]),

  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository]
})
export class CategoriesModule {}