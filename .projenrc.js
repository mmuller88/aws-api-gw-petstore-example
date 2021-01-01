const { AwsCdkTypeScriptApp } = require('projen');

const deps = [
  '@mobileposse/auto-delete-bucket',
  'openapi-types-aws',
  'aws-cdk-staging-pipeline',
];

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.80.0',
  cdkVersionPinning: true,
  name: 'aws-api-gw-petstore-example',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-s3',
  ],
  deps: deps,
  devDeps: deps,
  context: {
    '@aws-cdk/core:enableStackNameDuplicates': true,
    'aws-cdk:enableDiffNoFail': true,
    '@aws-cdk/core:stackRelativeExports': true,
    '@aws-cdk/core:newStyleStackSynthesis': true,
  },
  keywords: [
    'cdk',
    'aws',
    'openapi',
    'apigateway',
  ],
});

project.setScript('cdkDeploy', 'cdk deploy');
project.setScript('cdkDestroy', 'cdk destroy');

const common_exclude = ['cdk.out', 'src/site-contents/openapi.json'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
