import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type Result = {
  set: string;
}

export type MatchDocument = Match & Document;

@Schema()
export class Match {

  @Prop()
  category: string;

  @Prop({type: Types.ObjectId, ref: 'Player'})
  players: Array<Types.ObjectId>

  @Prop({type: Types.ObjectId, ref: 'Player'})
  def: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'Challenge'})
  challenge: Types.ObjectId;

  @Prop({set: String})
  results: Array<Result>
}

export const MatchSchema = SchemaFactory.createForClass(Match);