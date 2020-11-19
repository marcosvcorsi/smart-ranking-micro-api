import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AwsModule } from 'src/aws/aws.module';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    AwsModule
  ],
  controllers: [AuthController],
  providers: [JwtStrategy]
})
export class AuthModule {}
