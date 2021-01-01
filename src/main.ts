import * as core from '@aws-cdk/core';
// import { PipelineStack } from 'aws-cdk-staging-pipeline';
import { PipelineStack } from '../../aws-cdk-staging-pipeline/src/index';
import { ApiGwStack } from './apigw-stack';

const app = new core.App();

const stack = new core.Stack(app, 'petstoreStack');

new PipelineStack(stack, 'PipelineStack', {
  // Account and region where the pipeline will be build
  env: {
    account: '981237193288',
    region: 'eu-central-1',
  },
  // Staging Accounts e.g. dev qa prod
  stageAccounts: [{
    account: {
      id: '981237193288',
      region: 'eu-central-1',
    },
    stage: 'dev',
  }, {
    account: {
      id: '981237193288',
      region: 'us-east-1',
    },
    stage: 'prod',
  }],
  branch: 'master',
  repositoryName: 'aws-cdk-staging-pipeline',
  customStack: (scope, _) => {
    const apiGwStack = new ApiGwStack(scope, 'api-gw-stack-dev');
    return apiGwStack;
  },
  manualApprovals: (_) => true,
  testCommands: (stageAccount) => [
    `echo "${stageAccount.stage} stage"`,
    `echo ${stageAccount.account.id} id + ${stageAccount.account.region} region`,
  ],
  gitHub: { owner: 'mmuller88', oauthToken: new core.SecretValue('repo-token') },
});

app.synth();