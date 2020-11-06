import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {

  constructor(private readonly clienteProxyProvider: ClientProxyProvider) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clienteProxyProvider.getInstance().emit('create-category', createCategoryDto);
  }

  @Get()
  findAllCategories(@Query('id') id: string): Observable<any> {
    return this.clienteProxyProvider.getInstance().send('find-categories', id || '')
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    this.clienteProxyProvider.getInstance().emit('update-category', { id, ...updateCategoryDto })
  }
}
