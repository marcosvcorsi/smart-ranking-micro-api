import { IsEmail, IsMobilePhone, IsString, Matches } from "class-validator";

export class AuthRegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'invalid password' })
  password: string;

  @IsMobilePhone('pt-BR')
  phoneNumber: string;
}