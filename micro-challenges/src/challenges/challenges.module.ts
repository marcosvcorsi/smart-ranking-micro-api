import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { ChallengesController } from './controllers/challenges.controller';
import { Challenge, ChallengeSchema } from './models/challenge.schema';
import { ChallengesRepository } from './repositories/challenges.repository';
import { ChallengesService } from './services/challenges.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Challenge.name,
        schema: ChallengeSchema
      }
    ]),
    ClientProxyModule
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesRepository]
})
export class ChallengesModule {}
