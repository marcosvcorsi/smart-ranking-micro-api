
type Result = {
  set: string;
}


export class AddChallengeMatchDto {
  def: string
  results: Array<Result>
}