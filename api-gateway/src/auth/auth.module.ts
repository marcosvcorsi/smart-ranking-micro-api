import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    AwsModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
