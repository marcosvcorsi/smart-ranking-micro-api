import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { Injectable, Logger } from "@nestjs/common";
import { AwsCognitoConfig } from "src/aws/config/aws-cognito.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private readonly logger = new Logger(JwtStrategy.name);

  constructor(authConfig: AwsCognitoConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`
      })
    })
  }

  public async validate(payload: any) {
    this.logger.log(`payload: ${JSON.stringify(payload)}`);

    return { userId: payload.sub, email: payload.email };
  } 
}