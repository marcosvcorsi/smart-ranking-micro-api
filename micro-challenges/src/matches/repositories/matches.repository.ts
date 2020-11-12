import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Challenge } from "src/challenges/models/challenge.schema";
import { Match, MatchDocument } from "../models/match.schema";

@Injectable()
export class MatchesRepository {
  constructor(@InjectModel(Match.name) private readonly matchModel: Model<MatchDocument>) {}

  async create(matchDto: Match, challenge: Challenge): Promise<Types.ObjectId> {
    const match = new this.matchModel(matchDto);

    match.category = challenge.category;
    match.players = challenge.players;

    const doc = await match.save();

    return doc.id;
  }

  async delete(id: string): Promise<any> {
    return this.matchModel.deleteOne({_id: id});
  }
}