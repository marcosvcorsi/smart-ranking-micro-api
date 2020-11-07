import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {

  public async uploadFile(file: any, id: string) {
    const s3 = new AWS.S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET
    })

    const [,fileExt] = file.originalname.split('.');

    const bucketName = process.env.AWS_BUCKET_NAME;
    const urlKey = `${id}.${fileExt}`

    await s3.putObject({
      Body: file.buffer,
      Bucket: bucketName,
      Key: urlKey
    }).promise()

    return `https://${bucketName}.s3.amazonaws.com/${urlKey}`;
  }
}
