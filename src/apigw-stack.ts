import * as apigw from '@aws-cdk/aws-apigateway';
import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import { openApi } from './openapi';
import { StaticSite } from './static-site';

export interface ApiGwStackProps extends core.StackProps {
  readonly stage: string;
}

export class ApiGwStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: ApiGwStackProps) {
    super(scope, id, props);

    const api = new apigw.SpecRestApi(this, 'SpecRestApi', {
      restApiName: 'Petstore Example',
      apiDefinition: apigw.ApiDefinition.fromInline(openApi(props.stage)),
    });
    const apiGwEndpoint = new core.CfnOutput(this, 'ApiGwEndpoint', { value: api.urlForPath() });
    this.cfnOutputs.ApiGwEndpoint = apiGwEndpoint;

    const site = new StaticSite(this, {
      stage: props.stage,
    });
    const openApiUrl = new core.CfnOutput(this, 'OpenApiUrl', { value: site.openApiUrl });
    this.cfnOutputs.OpenApiUrl = openApiUrl;
  }
}