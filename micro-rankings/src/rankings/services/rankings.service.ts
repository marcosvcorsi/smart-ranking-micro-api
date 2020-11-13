import { Injectable } from '@nestjs/common';
import { RankingsRepository } from '../repositories/rankings.repository';

@Injectable()
export class RankingsService {

  constructor(private readonly rankingsRepository: RankingsRepository) {}

  async processMatch(matchId: string, match: any) {
    console.log(matchId, match);
  }
}
