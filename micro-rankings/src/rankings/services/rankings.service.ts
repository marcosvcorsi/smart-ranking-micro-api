import { Injectable } from '@nestjs/common';
import { RankingsRepository } from '../repositories/rankings.repository';

@Injectable()
export class RankingsService {

  constructor(private readonly rankingsRepository: RankingsRepository) {}

  async processMatch(matchId: string, match: any) {
    const promises = match.players.map(async player => {
      return this.rankingsRepository.create(match, matchId, player);
    })

    await Promise.all(promises);
  }
}
