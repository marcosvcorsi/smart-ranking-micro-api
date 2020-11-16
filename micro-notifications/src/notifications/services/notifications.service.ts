import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import htmlNotification from '../templates/notification-challenger.template';


@Injectable()
export class NotificationsService {

  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly clientProxy: ClientProxyProvider
  ) {}

  async sendEmailChallenge(challenge: any) {
    try {

      const playerIdToSend = challenge.players.find(player => player !== challenge.challenger);

      const playerToSend = await this.clientProxy.getAdminServerInstance().send('find-players', playerIdToSend).toPromise();

      const challenger = await this.clientProxy.getAdminServerInstance().send('find-players', challenge.challenger).toPromise();

      const htmlToSend = htmlNotification.replace(/#NOME_ADVERSARIO/g, playerToSend.name)
                                         .replace(/#NOME_SOLICITANTE/g, challenger.name);
      
      const result = await this.mailerService.sendMail({
        to: playerToSend.email,
        from: `SMART RANKING <api.smartranking@gmail.com>`,
        subject: 'Notificação de Desafio',
        html: htmlToSend
      })
      
      this.logger.log(result);
    } catch(error) {
      this.logger.error(error);
      throw new RpcException(error.message);
    }
  }
}
