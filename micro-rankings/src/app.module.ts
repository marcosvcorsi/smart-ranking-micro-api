import { Module } from '@nestjs/common';
import { RankingsModule } from './rankings/rankings.module';

@Module({
  imports: [RankingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
