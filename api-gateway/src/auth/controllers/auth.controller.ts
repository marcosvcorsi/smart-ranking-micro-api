import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AwsCognitoService } from 'src/aws/services/aws-cognito.service';
import { AuthLoginUserDto } from '../dtos/auth-login-user.dto';
import { AuthRegisterUserDto } from '../dtos/auth-register-user.dto';

@Controller('api/v1/auth')
export class AuthController {

  constructor(private readonly awsCognitoService: AwsCognitoService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    return this.awsCognitoService.registerUser(authRegisterUserDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return this.awsCognitoService.authenticateUser(authLoginUserDto);
  }
}
