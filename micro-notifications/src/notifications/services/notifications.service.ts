import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {

  async sendEmailChallenge(challenge: any) {
    return Promise.resolve();
  }
}
