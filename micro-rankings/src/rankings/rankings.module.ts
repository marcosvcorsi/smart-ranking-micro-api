import { Module } from '@nestjs/common';
import { RankingsService } from './services/rankings.service';
import { RankingsController } from './controllers/rankings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ranking, RankingSchema } from './models/ranking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ranking.name,
        schema: RankingSchema
      }
    ])
  ],
  providers: [RankingsService],
  controllers: [RankingsController]
})
export class RankingsModule {}
