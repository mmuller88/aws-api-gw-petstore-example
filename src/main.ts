import * as apigw from '@aws-cdk/aws-apigateway';
// import * as iam from '@aws-cdk/aws-iam';
import * as core from '@aws-cdk/core';
import { openApi } from './openapi';
import { StaticSite } from './static-site';

export class ApiGwStack extends core.Stack {
  constructor(scope: core.Construct, id: string, props: core.StackProps = {}) {
    super(scope, id, props);

    new apigw.SpecRestApi(this, 'SpecRestApi', {
      restApiName: 'Petstore Example',
      apiDefinition: apigw.ApiDefinition.fromInline(openApi),
    });

    new StaticSite(this);
  }
}

const app = new core.App();

new ApiGwStack(app, 'api-gw-stack-dev');

app.synth();