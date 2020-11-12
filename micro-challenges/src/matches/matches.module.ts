import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module';
import { MatchesController } from './controllers/matches.controller';
import { Match, MatchSchema } from './models/match.schema';
import { MatchesRepository } from './repositories/matches.repository';
import { MatchesService } from './services/matches.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Match.name,
        schema: MatchSchema
      }
    ]),
    ClientProxyModule,
  ],
  controllers: [MatchesController],
  providers: [
    MatchesService,
    MatchesRepository
  ]
})
export class MatchesModule {}
