import { Injectable } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxyProvider {

  getInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: 'admin-server'
      }
    })
  }
}