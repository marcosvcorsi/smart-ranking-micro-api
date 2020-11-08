import { PlayerDto } from "src/players/dtos/player.dto";

export enum StatusChallenge {
  DONE = 'DONE',
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  CANCEL = 'CANCEL'
}

export class ChallengeDto {
  status: StatusChallenge;

  dateTimeChallenge: Date;

  dateTimeRequest: Date;

  dateTimeAnswer: Date;

  category: string;

  challenger: PlayerDto;

  players: Array<PlayerDto>

  match: string;
}