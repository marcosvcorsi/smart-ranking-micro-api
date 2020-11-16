import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationsService } from '../services/notifications.service';

@Controller()
export class NotificationsController {

  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notifications-new-challenge')
  async sendEmailChallenge(@Payload() challenge: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    await this.notificationsService.sendEmailChallenge(challenge);

    await channel.ack(originalMessage);
  }
}
