import { IsNotEmpty } from 'class-validator';

export class UpdatePlayerDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;
}