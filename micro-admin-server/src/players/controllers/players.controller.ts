import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { PlayersService } from "../services/players.service";

@Controller()
export class PlayersController {

  constructor(private readonly playersService: PlayersService) {}

  @MessagePattern('find-players')
  async findAllCategories(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      if(id) {
        return this.playersService.findById(id);
      }

      return this.playersService.findAll();
    } finally {
      await channel.ack(originalMessage);
    }
  }
}