import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RankingsService } from '../services/rankings.service';

@Controller()
export class RankingsController {

  private readonly logger = new Logger(RankingsController.name);
 
  constructor(private readonly rankingsService: RankingsService) {}

  @EventPattern('process-match')
  async processMatch(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.log(JSON.stringify(data));

    const { matchId, match } = data;

    await this.rankingsService.processMatch(matchId, match);

    await channel.ack(originalMsg);
  }

  @EventPattern('find-rankings')
  async findAll(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const { categoryId, dateRef } = data;

      return this.rankingsService.findAll(categoryId, dateRef);
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
