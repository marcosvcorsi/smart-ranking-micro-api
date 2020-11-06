import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
  private clienteAdminServer : ClientProxy;

  constructor() {
    this.clienteAdminServer = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: 'admin-server'
      }
    })
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clienteAdminServer.emit('create-category', createCategoryDto);
  }

  @Get()
  findAllCategories(@Query('id') id: string): Observable<any> {
    return this.clienteAdminServer.send('find-categories', id || '')
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    this.clienteAdminServer.emit('update-category', { id, ...updateCategoryDto })
  }
}
