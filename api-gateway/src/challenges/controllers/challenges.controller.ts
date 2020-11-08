import { BadRequestException, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';

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
}
