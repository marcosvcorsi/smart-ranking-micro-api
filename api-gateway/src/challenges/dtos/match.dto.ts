import { PlayerDto } from "src/players/dtos/player.dto";

export type Result = {
  set: string;
}

export class MatchDto {
  category: string;
  challenge: string;
  players: Array<PlayerDto>
  def: string;
  results: Array<Result>
}