const { AwsCdkTypeScriptApp } = require('projen');

const deps = [
  '@mobileposse/auto-delete-bucket',
]

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.80.0',
  name: 'aws-api-gw-petstore-example',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-cloudfront',
    '@aws-cdk/aws-route53',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-s3',
  ],
  deps: deps,
  devDeps: deps,
  keywords: [
    'cdk',
    'aws',
    'ssm',
    'parameter',
    'custom-resource',
    'sdk',
  ],
});

project.setScript('cdkDeploy', 'cdk deploy');
project.setScript('cdkDestroy', 'cdk destroy');

const common_exclude = ['cdk.out'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
