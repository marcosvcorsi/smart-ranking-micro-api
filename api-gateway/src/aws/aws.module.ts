import { Module } from '@nestjs/common';
import { AwsCognitoConfig } from './config/aws-cognito.config';
import { AwsCognitoService } from './services/aws-cognito.service';
import { AwsService } from './services/aws.service';

@Module({
  providers: [AwsService, AwsCognitoConfig, AwsCognitoService],
  exports: [AwsService, AwsCognitoConfig,AwsCognitoService]
})
export class AwsModule {}
