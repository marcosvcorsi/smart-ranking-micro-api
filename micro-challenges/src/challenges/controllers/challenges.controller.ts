import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { ChallengesService } from '../services/challenges.service';

@Controller()
export class ChallengesController {

  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly challengesService: ChallengesService) {}

  @EventPattern('create-challenge')
  async create(@Payload() createChallengeDto: CreateChallengeDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage();

    this.logger.log(JSON.stringify(createChallengeDto))
    await this.challengesService.create(createChallengeDto);

    await channel.ack(originalMsg);
  }
  
  @MessagePattern('find-challenges')
  async findAll(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage();

    try {
      this.logger.log(JSON.stringify(data))

      const {playerId, id } = data;

      if(playerId) {
        return this.challengesService.findAllByPlayerId(playerId);
      }
  
      if(id) {
        return this.challengesService.findById(id);
      }
  
      return this.challengesService.findAll();
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('update-challenge')
  async update(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage();

    this.logger.log(JSON.stringify(data));
    const {id, challenge} = data;

    await this.challengesService.update(id, challenge);

    await channel.ack(originalMsg);
  }

  @EventPattern('update-challenge-match')
  async updateChallengeMatch(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage();

    this.logger.log(JSON.stringify(data));
    const {id, matchId, challenge} = data;

    await this.challengesService.updateChallengeMatch(id, matchId, challenge);

    await channel.ack(originalMsg);
  }

  @EventPattern('delete-challenge')
  async delete(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage();

    this.logger.log(JSON.stringify(data));
    const { id, challenge } = data;

    await this.challengesService.delete(id, challenge)

    await channel.ack(originalMsg);
  }
}
