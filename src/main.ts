import * as core from '@aws-cdk/core';
import { ApiGwStack } from './apigw-stack';

const app = new core.App();

new ApiGwStack(app, 'api-gw-stack-dev');

app.synth();