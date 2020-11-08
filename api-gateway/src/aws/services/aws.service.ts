import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {

  constructor(private readonly configService: ConfigService) {}

  public async uploadFile(file: any, id: string) {
    const s3 = new AWS.S3({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET')
    })

    const [,fileExt] = file.originalname.split('.');

    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const urlKey = `${id}.${fileExt}`

    await s3.putObject({
      Body: file.buffer,
      Bucket: bucketName,
      Key: urlKey
    }).promise()

    return `https://${bucketName}.s3.amazonaws.com/${urlKey}`;
  }
}
