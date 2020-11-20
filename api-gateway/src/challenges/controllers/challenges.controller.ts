import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { AddChallengeMatchDto } from '../dtos/add-challenge-match.dto';
import { StatusChallenge } from '../dtos/challenge.dto';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { MatchDto } from '../dtos/match.dto';
import { UpdateChallengeDto } from '../dtos/update-challenge.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/challenges')
export class ChallengesController {

  constructor(private clientProxyProvider: ClientProxyProvider) {}

  @Get()
  async findAll(@Query('player') playerId: string) {
    if(playerId) {
      const player = await this.clientProxyProvider.getAdminServerInstance().send('find-players', playerId).toPromise();

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

    await this.clientProxyProvider.getChallengeInstance().emit('delete-challenge', {id, challenge}).toPromise();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    const players = await this.clientProxyProvider.getAdminServerInstance().send('find-players', '').toPromise();

    createChallengeDto.players.map(player => {
      const findPlayer = players.find(item => String(item._id) === player);

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

    await this.clientProxyProvider.getChallengeInstance().emit('update-challenge', { id, challenge: updateChallengeDto}).toPromise();
  }

  @Post(':id/match')
  async addChallengeMatch(@Param('id') id: string, @Body() addChallengeMatchDto: AddChallengeMatchDto) {
    const challenge = await this.clientProxyProvider.getChallengeInstance().send('find-challenges', { id }).toPromise();

    if(!challenge) {
      throw new BadRequestException('Challenge not found');
    }

    if(challenge.status === StatusChallenge.DONE) {
      throw new BadRequestException('Challenge already done')
    }

    if(challenge.status !== StatusChallenge.ACCEPTED) {
      throw new BadRequestException('The challenge was not accepted')
    }

    if(!challenge.players.includes(addChallengeMatchDto.def)) {
      throw new BadRequestException('The winner should be part of challenge')
    }

    const match = new MatchDto();

    match.category = challenge.category;
    match.def = addChallengeMatchDto.def;
    match.challenge =id;
    match.players = challenge.players;
    match.results = addChallengeMatchDto.results;

    await this.clientProxyProvider.getChallengeInstance().emit('create-match', match).toPromise();
  }
}
