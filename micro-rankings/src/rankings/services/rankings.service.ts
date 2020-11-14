import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { EventName } from '../models/event-name.enum';
import { RankingsRepository } from '../repositories/rankings.repository';

@Injectable()
export class RankingsService {

  private readonly logger = new Logger(RankingsService.name);

  constructor(
    private readonly rankingsRepository: RankingsRepository,
    private readonly clientProxy: ClientProxyProvider
  ) {}

  private getEventProps(category: any, eventName: string) {
    const event = category.events.find(event => event.name === eventName);

    const { name, value, operation } = event;

    return {
      name,
      value,
      operation
    }
  }

  async processMatch(matchId: string, match: any) {
    try {
      await Promise.all(match.players.map(async player => {
          const category = await this.clientProxy.getAdminServerInstance().send('find-categories', match.category).toPromise();

          const { name, operation, value } = this.getEventProps(category, player === match.def ? EventName.VICTORY : EventName.DEFEAT);

          return this.rankingsRepository.create({match, matchId, player, value, operation, name });
        })
      )
    } catch(error) {
      this.logger.error(error);
      throw new RpcException(error.message);
    }
  }
}
