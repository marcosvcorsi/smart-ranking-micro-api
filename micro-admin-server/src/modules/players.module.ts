import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from 'src/controllers/players.controller';
import { Player, PlayerSchema } from 'src/models/player.schema';
import { PlayersRepository } from 'src/repositories/players.repository';
import { PlayersService } from 'src/services/players.service';

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