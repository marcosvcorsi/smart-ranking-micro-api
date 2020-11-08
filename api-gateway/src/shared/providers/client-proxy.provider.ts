import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxyProvider {

  constructor(private readonly configService: ConfigService) {}

  getInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'admin-server'
      }
    })
  }
}