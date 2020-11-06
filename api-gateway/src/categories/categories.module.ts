import { Module } from '@nestjs/common';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [ClientProxyProvider]
})
export class CategoriesModule {}
