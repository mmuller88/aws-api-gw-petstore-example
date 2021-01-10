synth: [![Synth](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?projectName=PipelineBuildSynthCdkBuildP-PKJQr5O4bxOH)](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?url=true&projectName=PipelineBuildSynthCdkBuildP-PKJQr5O4bxOH)

update pipeline: [![Synth](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?projectName=CdkPipelineUpdatePipelineSe-KkpmmB0Vlo0R)](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?url=true&projectName=CdkPipelineUpdatePipelineSe-KkpmmB0Vlo0R)

dev Tests: [![Dev Integration Tests](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?projectName=Pipelinepetstorepipelinedev-H2KGS7v5V1Mf)](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?url=true&projectName=Pipelinepetstorepipelinedev-H2KGS7v5V1Mf)

prod Tests: [![Dev Integration Tests](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?projectName=Pipelinepetstorepipelinepro-zwmgDM9gvfVj)](https://eg5eeauw7k.execute-api.eu-central-1.amazonaws.com/prod/?url=true&projectName=Pipelinepetstorepipelinepro-zwmgDM9gvfVj)

# aws-api-gw-petstore-example

OpenApi 3 Petstore from https://petstore3.swagger.io/ saved in openapi.json

# Projen

[Projen](https://github.com/projen/projen) is a very cool framework to automatically synth project files. If you want make changes to git files like .gitignore or the package.json use .projen.js and run

```
npx projen
```

# AWS CDK

For deploy to AWS run:

```
yarn install
yarn cdkDeploy --all --profile X
```

For destroy run:

```
yarn cdkDestroy --all --profile X
```
