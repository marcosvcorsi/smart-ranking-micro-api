import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type RankingDocument = Ranking & Document;

@Schema()
export class Ranking {
  @Prop({type: Types.ObjectId})
  challenge: Types.ObjectId;

  @Prop({type: Types.ObjectId})
  player: Types.ObjectId;

  @Prop({type: Types.ObjectId})
  match: Types.ObjectId;

  @Prop({type: Types.ObjectId})
  category: Types.ObjectId;

  @Prop()
  event: string;

  @Prop()
  operation: string;

  @Prop()
  points: number;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);