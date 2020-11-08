import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { StatusChallenge } from '../dtos/challenge.dto';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { UpdateChallengeDto } from '../dtos/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {

  constructor(private clientProxyProvider: ClientProxyProvider) {}

  @Get()
  async findAll(@Query('player') playerId: string) {
    if(playerId) {
      const player = await this.clientProxyProvider.getAdminServerInstance().send('find-player', playerId).toPromise();

      if(!player) {
        throw new BadRequestException('Player not found')
      }
    }

    return this.clientProxyProvider.getChallengeInstance().send('find-challenges', { playerId }).toPromise();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const challenge =  await this.clientProxyProvider.getChallengeInstance().send('find-challenges', { id }).toPromise();

    if(!challenge) {
      throw new BadRequestException('Challenge not found');
    }

    await this.clientProxyProvider.getChallengeInstance().emit('delete-challenge', challenge).toPromise();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    const players = await this.clientProxyProvider.getAdminServerInstance().send('find-players', '').toPromise();

    createChallengeDto.players.map(player => {
      const findPlayer = players.find(item => String(item.id) === player);

      if(!findPlayer) {
        throw new BadRequestException(`Player ${player} not found`);
      }

      if(findPlayer.category != createChallengeDto.category) {
        throw new BadRequestException(`Category of ${player} doest not match`);
      }
    })

    const challengerIsAPlayer = createChallengeDto.players.find(player => player === createChallengeDto.challenger)

    if(!challengerIsAPlayer) {
      throw new BadRequestException('The challenge shoud be present in players list')
    }

    const category = await this.clientProxyProvider.getAdminServerInstance().send('find-categories', createChallengeDto.category).toPromise();

    if(!category) {
      throw new BadRequestException('Category not found');
    }

    await this.clientProxyProvider.getChallengeInstance().emit('create-challenge', createChallengeDto).toPromise();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    const challenge = await this.clientProxyProvider.getChallengeInstance().send('find-challenges', { id }).toPromise();

    if(!challenge) {
      throw new BadRequestException('Challenge not found');
    }

    if(challenge.status !== StatusChallenge.WAITING) {
      throw new BadRequestException('Only waiting challenges can be updated')
    }

    await this.clientProxyProvider.getChallengeInstance().emit('update-challenge', { id, ... updateChallengeDto }).toPromise();
  }
}
