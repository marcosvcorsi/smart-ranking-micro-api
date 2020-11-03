import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { CreateCategoryDto } from './dtos/categories/create-category.dto';

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
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<void> {
    return this.clienteAdminServer.emit('create-category', createCategoryDto).toPromise();
  }
}