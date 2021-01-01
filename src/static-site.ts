import { HttpMethods } from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import { CfnOutput, RemovalPolicy, Stack } from '@aws-cdk/core';
import { AutoDeleteBucket } from '@mobileposse/auto-delete-bucket';

import { openApi } from './openapi';

export interface StaticSiteProps {
  readonly stage: string;
}
export class StaticSite {
  constructor(scope: Stack, props: StaticSiteProps) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    fs.writeFileSync('./src/site-contents/openapi-dev/openapi.json', JSON.stringify(openApi('dev')));
    fs.writeFileSync('./src/site-contents/openapi-prod/openapi.json', JSON.stringify(openApi('prod')));
    /**
     * NOTE: S3 requires bucket names to be globally unique across accounts so
     * you will need to change the bucketName to something that nobody else is
     * using.
     */
    const siteBucket = new AutoDeleteBucket(scope, 'SiteBucket', {
      // AutoDeleteBucket
      // bucketName: siteDomain,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      cors: [
        {
          allowedMethods: [HttpMethods.GET, HttpMethods.HEAD],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          exposedHeaders: ['ETag', 'x-amz-meta-custom-header', 'Authorization', 'Content-Type', 'Accept'],
        },
      ],
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(scope, 'OpenApiUrl', { value: siteBucket.bucketWebsiteUrl });
    // scope.cfnOutputs['OpenApiUrl'] = openApiUrl;

    // Deploy site contents to S3 bucket
    // tslint:disable-next-line: no-unused-expression
    new s3deploy.BucketDeployment(scope, 'BucketDeployment', {
      sources: [s3deploy.Source.asset('./src/site-contents'), s3deploy.Source.asset(`./src/site-contents/openapi-${props.stage}`)],
      destinationBucket: siteBucket,
    });
  }
}
