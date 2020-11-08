import { IsNotEmpty } from 'class-validator';

export type Result = {
  set: string;
}

export class AddChallengeMatchDto {

  @IsNotEmpty()
  def: string

  @IsNotEmpty()
  results: Array<Result>
}