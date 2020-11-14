import { Module } from '@nestjs/common';
import { RankingsService } from './services/rankings.service';
import { RankingsController } from './controllers/rankings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ranking, RankingSchema } from './models/ranking.schema';
import { RankingsRepository } from './repositories/rankings.repository';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ranking.name,
        schema: RankingSchema
      }
    ]),
    ClientProxyModule
  ],
  providers: [RankingsService, RankingsRepository],
  controllers: [RankingsController]
})
export class RankingsModule {}
