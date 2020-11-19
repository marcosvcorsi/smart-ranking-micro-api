import { Injectable } from "@nestjs/common";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { AuthLoginUserDto } from "src/auth/dtos/auth-login-user.dto";
import { AuthRegisterUserDto } from "src/auth/dtos/auth-register-user.dto";
import { AwsCognitoConfig } from "../config/aws-cognito.config";

@Injectable()
export class AwsCognitoService {

  private userPool: CognitoUserPool;

  constructor(authConfig: AwsCognitoConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: authConfig.userPoolId,
      ClientId: authConfig.clientId
    })
  }

  async registerUser(authRegisterUserDto: AuthRegisterUserDto) {
    const { name, email, password, phoneNumber } = authRegisterUserDto;
  
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email, 
        password, 
        [
          new CognitoUserAttribute({
            Name: 'name',
            Value: name
          }),
          new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phoneNumber
          })
        ], 
        null, 
        (err, result) => {
          if(!result) {
            reject(err);
          }
          
          resolve(result.user);
        }
      )
    })
  }

  async authenticateUser(authLoginUserDto: AuthLoginUserDto) {
    const { email, password } = authLoginUserDto;

    const userCognito = new CognitoUser({
      Username: email,
      Pool: this.userPool
    })

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(new AuthenticationDetails({
        Username: email,
        Password: password
      }), {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (error) => {
          reject(error);
        }
      })
    })
  }
}