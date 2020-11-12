import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Match } from '../models/match.schema';
import { MatchesService } from '../services/matches.service';

@Controller()
export class MatchesController {

  constructor(private readonly matchesService: MatchesService) {}

  @EventPattern('create-match')
  async create(@Payload() match: Match, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    await this.matchesService.create(match)

    await channel.ack(originalMsg)
  }
}
