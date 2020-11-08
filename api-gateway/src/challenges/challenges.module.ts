import { Module } from '@nestjs/common';
import { ChallengesController } from './controllers/challenges.controller';

@Module({
  controllers: [ChallengesController]
})
export class ChallengesModule {}
