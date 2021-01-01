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
