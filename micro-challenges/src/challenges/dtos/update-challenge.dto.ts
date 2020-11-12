import { StatusChallenge } from "../models/challenge.schema";

export class UpdateChallengeDto {
  dateTimeChallenge: Date;
  status: StatusChallenge;
  dateTimeAnswer: Date;
}