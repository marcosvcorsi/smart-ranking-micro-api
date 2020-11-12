export class CreateChallengeDto {
  dateTimeChallenge: Date;
  challenger: string;
  category: string;
  players: Array<string>
}