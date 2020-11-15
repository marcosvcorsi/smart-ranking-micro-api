import { Module } from '@nestjs/common';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { RankingsController } from './controllers/rankings.controller';

@Module({
  imports:[
    ClientProxyModule
  ],
  controllers: [RankingsController]
})
export class RankingsModule {}
