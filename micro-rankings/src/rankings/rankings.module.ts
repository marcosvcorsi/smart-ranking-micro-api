import { Module } from '@nestjs/common';
import { RankingsService } from './services/rankings.service';
import { RankingsController } from './controllers/rankings.controller';

@Module({
  providers: [RankingsService],
  controllers: [RankingsController]
})
export class RankingsModule {}
