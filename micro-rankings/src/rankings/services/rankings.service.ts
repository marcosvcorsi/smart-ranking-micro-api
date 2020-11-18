import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { EventName } from '../models/event-name.enum';
import { RankingsRepository } from '../repositories/rankings.repository';
import * as _ from 'lodash';
import { RankingResponse } from '../dtos/ranking-response.dto';

@Injectable()
export class RankingsService {

  private readonly logger = new Logger(RankingsService.name);

  constructor(
    private readonly rankingsRepository: RankingsRepository,
    private readonly clientProxy: ClientProxyProvider
  ) {}

  private getEventProps(category: any, eventName: string) {
    const event = category.events.find(event => event.name === eventName);

    if(!event) {
      return null;
    }

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

          const event = this.getEventProps(category, player === match.def ? EventName.VICTORY : EventName.DEFEAT);

          if(event) {
            const { name, operation, value } = event;

            return this.rankingsRepository.create({match, matchId, player, value, operation, name });
          }
        })
      )
    } catch(error) {
      this.logger.error(error);
      throw new RpcException(error.message);
    }
  }

  async findAll(categoryId: string, dateRef: string ) {
    try {
      if(!dateRef) {
        dateRef = new Intl.DateTimeFormat().format(new Date());
      }

      const rankings = await this.rankingsRepository.findAllByCategory(categoryId);

      const challenges = await this.clientProxy.getChallengeInstance().send('find-challenges-done', { categoryId, dateRef }).toPromise();
      
      _.remove(rankings, item => {
        return !challenges.some(challenge => challenge._id === item.challenge);
      })

      const results = _(rankings)
                      .groupBy('player')
                      .map((items, key) => ({
                        player: key,
                        matchHistory: _.countBy(items, 'event'),
                        points: _.sumBy(items, 'points') 
                      }))
                      .value();
      
      const orderedResutls = _.orderBy(results, 'points', 'desc');

      const rankingResponseList: RankingResponse[] = orderedResutls.map((item, index) => {
        const { player, points, matchHistory } = item;
        
        return {
          player,
          position: index + 1,
          points,
          matchHistory: {
            victories: matchHistory[EventName.VICTORY] || 0,
            defeats: matchHistory[EventName.DEFEAT] || 0
          }
        }
      })

      return rankingResponseList;
    } catch(error) {
      this.logger.error(error);
      throw new RpcException(error.message);
    }
  }
}
