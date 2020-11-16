import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxyProvider {

  constructor(private readonly configService: ConfigService) {}

  getAdminServerInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'admin-server'
      }
    })
  }

  getChallengesInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'challenges'
      }
    })
  }

  getRankingsInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'rankings'
      }
    })
  }

  getNotificationsInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'notifications'
      }
    })
  }
}