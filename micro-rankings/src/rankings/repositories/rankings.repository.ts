import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { RankingDocument } from "../models/ranking.schema";

type CreateRanking = {
  match: any;
  matchId: string;
  player: string;
  name: string;
  value: number;
  operation: string;
}

@Injectable()
export class RankingsRepository {

  constructor(@InjectModel('Ranking') private readonly rankingModel: Model<RankingDocument>) {}

  async create({ match, matchId, player, value, operation, name }: CreateRanking) {
    const ranking =  new this.rankingModel();

    ranking.category = match.category;
    ranking.challenge = match.challenge;
    ranking.match = Types.ObjectId(matchId);
    ranking.player = Types.ObjectId(player);

    ranking.event = name;
    ranking.points = value;
    ranking.operation = operation;

    await ranking.save()
  }

  async findAllByCategory(categoryId: string) {
    return this.rankingModel.find().where('category').equals(categoryId);
  }
}