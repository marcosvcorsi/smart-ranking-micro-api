import { Injectable } from '@nestjs/common';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { Match } from '../models/match.schema';
import { MatchesRepository } from '../repositories/matches.repository';

@Injectable()
export class MatchesService {

  constructor(
    private readonly clientProxy: ClientProxyProvider,
    private readonly matchesRepository: MatchesRepository
  ) {}
  
  async create(match: Match) {
    const challenge = await this.clientProxy.getChallengesInstance().send('find-challenges', { id: String(match.challenge) }).toPromise();

    const matchId = await this.matchesRepository.create(match, challenge);

    await this.clientProxy.getChallengesInstance().emit('update-challenge-match', { matchId, id: match.challenge }).toPromise();

    return this.clientProxy.getRankingsInstance().emit('process-match', { matchId, match }).toPromise();
  }
}
