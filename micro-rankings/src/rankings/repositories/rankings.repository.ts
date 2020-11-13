import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { RankingDocument } from "../models/ranking.schema";

@Injectable()
export class RankingsRepository {

  constructor(@InjectModel('Ranking') private readonly rankingModel: Model<RankingDocument>) {}

  async create(match: any, matchId: string, player: string) {
    const ranking =  new this.rankingModel();

    ranking.category = match.category;
    ranking.challenge = match.challenge;
    ranking.match = Types.ObjectId(matchId);
    ranking.player = Types.ObjectId(player);

    if(player === match.def) {
      ranking.event = 'V';
      ranking.points = 30;
      ranking.operation = '+';
    } else {
      ranking.event = 'D';
      ranking.points = 0;
      ranking.operation = '+';
    }

    await ranking.save()
  }
}