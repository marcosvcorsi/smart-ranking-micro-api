import { Module } from '@nestjs/common';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { ChallengesController } from './controllers/challenges.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [ChallengesController]
})
export class ChallengesModule {}
