import { IsEnum, IsOptional } from "class-validator";
import { StatusChallenge } from "./challenge.dto";


export class UpdateChallengeDto {
  @IsOptional()
  @IsEnum(StatusChallenge)
  status: StatusChallenge;
}