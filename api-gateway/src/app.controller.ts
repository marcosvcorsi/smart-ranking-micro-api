import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Observable } from 'rxjs';
import { CreateCategoryDto } from './dtos/categories/create-category.dto';
import { UpdateCategoryDto } from './dtos/categories/update-category.dto';

@Controller('api/v1')
export class AppController {
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

  @Post('categories')
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clienteAdminServer.emit('create-category', createCategoryDto);
  }

  @Get('categories')
  findAllCategories(@Query('id') id: string): Observable<any> {
    return this.clienteAdminServer.send('find-categories', id || '')
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    this.clienteAdminServer.emit('update-category', { id, ...updateCategoryDto })
  }
}