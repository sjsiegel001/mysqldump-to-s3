# Lambda S3 mysqldump

AWS Lambda function which mysqldumps an RDS to S3

## Installation

install node-lambda

```bash
npm install -g node-lambda
```

## Usage

add configuration settings to env file.

Probably needs [a lambda layer](https://github.com/gkrizek/bash-lambda-layer) to run the aws command. mysqldump bin is included.

```bash
cp example.env .env
```

## Deploy with node-lambda
```bash
node-lambda deploy
```
also add your environment variables in the lambda management console:

- `EXPORT_DB_HOST` the RDS endpoint
- `EXPORT_DB_NAME` the name of the database to dump
- `EXPORT_DB_USERNAME` the username
- `EXPORT_DB_PASSWORD` the password
- `EXPORT_S3_PATH` the name of the destination S3 bucket
