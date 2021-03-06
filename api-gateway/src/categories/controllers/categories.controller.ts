import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/categories')
export class CategoriesController {

  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clientProxyProvider.getAdminServerInstance().emit('create-category', createCategoryDto);
  }

  @Get()
  findAllCategories(@Query('id') id: string): Observable<any> {
    return this.clientProxyProvider.getAdminServerInstance().send('find-categories', id || '')
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    this.clientProxyProvider.getAdminServerInstance().emit('update-category', { id, ...updateCategoryDto })
  }
}
