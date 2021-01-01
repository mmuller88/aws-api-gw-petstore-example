import * as apigw from '@aws-cdk/aws-apigateway';
import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import { openApi } from './openapi';
import { StaticSite } from './static-site';

export class ApiGwStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: core.StackProps = {}) {
    super(scope, id, props);

    new apigw.SpecRestApi(this, 'SpecRestApi', {
      restApiName: 'Petstore Example',
      apiDefinition: apigw.ApiDefinition.fromInline(openApi),
    });

    new StaticSite(this);
  }
}