import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { PlayersController } from './controllers/players.controller';

@Module({
  imports: [ClientProxyModule, AwsModule],
  controllers: [PlayersController]
})
export class PlayersModule {}
