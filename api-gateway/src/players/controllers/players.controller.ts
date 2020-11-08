import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { AwsService } from 'src/aws/services/aws.service';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {

  constructor(
    private readonly clientProxyProvider: ClientProxyProvider,
    private readonly awsService: AwsService
  ) {}

  @Get()
  findAllPlayers(): Observable<any> {
    return this.clientProxyProvider.getInstance().send('find-players', '')
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<any> {
    return this.clientProxyProvider.getInstance().send('find-players', id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    const category = await this.clientProxyProvider.getInstance().send('find-categories', createPlayerDto.category).toPromise();

    if(!category) {
      throw new BadRequestException('Category not found')
    }

    await this.clientProxyProvider.getInstance().emit('create-player', createPlayerDto).toPromise();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    const category = await this.clientProxyProvider.getInstance().send('find-categories', updatePlayerDto.category).toPromise();

    if(!category) {
      throw new BadRequestException('Category not found')
    }

    await this.clientProxyProvider.getInstance().emit('update-player', { id, ...updatePlayerDto }).toPromise();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.clientProxyProvider.getInstance().emit('delete-player', id).toPromise();
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') id: string, @UploadedFile() file) {
    const player = await this.clientProxyProvider.getInstance().send('find-players', id).toPromise();

    if(!player) {
      throw new BadRequestException('Player not found')
    }

    const imgUrl = await this.awsService.uploadFile(file, id);
    
    await this.clientProxyProvider.getInstance().emit('update-player', { id, imgUrl }).toPromise()
  }
}