import { Module } from '@nestjs/common';
import { PlayersController } from './controllers/players.controller';

@Module({
  controllers: [PlayersController]
})
export class PlayersModule {}
