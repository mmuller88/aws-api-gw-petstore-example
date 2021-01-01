import * as core from '@aws-cdk/core';
import { PipelineStack } from 'aws-cdk-staging-pipeline';
// import { PipelineStack } from '../../aws-cdk-staging-pipeline/src/index';
import { ApiGwStack } from './apigw-stack';

const app = new core.App();

new PipelineStack(app, 'petstore-pipeline', {
  stackName: 'petstore-pipeline',
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
  repositoryName: 'aws-api-gw-petstore-example',
  customStack: (scope, stageAccount) => {
    const apiGwStack = new ApiGwStack(scope, `petstore-stack-${stageAccount.stage}`, {
      stackName: `petstore-stack-${stageAccount.stage}`,
      stage: stageAccount.stage,
    });
    return apiGwStack;
  },
  manualApprovals: (_) => true,
  testCommands: (stageAccount) => [
    `echo "${stageAccount.stage} stage"`,
    `echo ${stageAccount.account.id} id + ${stageAccount.account.region} region`,
  ],
  gitHub: {
    owner: 'mmuller88',
    oauthToken: core.SecretValue.secretsManager('alfcdk', {
      jsonField: 'muller88-github-token',
    }),
  },
});

app.synth();