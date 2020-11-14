import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RankingsRepository } from '../repositories/rankings.repository';

@Injectable()
export class RankingsService {

  constructor(private readonly rankingsRepository: RankingsRepository) {}

  async processMatch(matchId: string, match: any) {
    try {
      await Promise.all(match.players.map(async player => {
          return this.rankingsRepository.create(match, matchId, player);
        })
      )
    } catch(error) {
      throw new RpcException(error.message);
    }
  }
}
