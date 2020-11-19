import { Module } from '@nestjs/common';
import { AwsCognitoService } from './services/aws-cognito.service';
import { AwsService } from './services/aws.service';

@Module({
  providers: [AwsService, AwsCognitoService],
  exports: [AwsService, AwsCognitoService]
})
export class AwsModule {}
