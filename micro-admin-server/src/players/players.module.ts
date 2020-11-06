import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from 'src/players/controllers/players.controller';
import { Player, PlayerSchema } from 'src/players/models/player.schema';
import { PlayersRepository } from 'src/players/repositories/players.repository';
import { PlayersService } from 'src/players/services/players.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema
      }
    ])
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService, PlayersRepository]
})
export class PlayersModule {}