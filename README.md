# Lambda S3 mysqldump

AWS Lambda function which mysqldumps an RDS to S3

## Installation

install node-lambda

```bash
npm install -g node-lambda
```

## Usage

add configuration settings to env file. Configure `dbhost` and

```bash
cp example.env .env
```

## Deploy with node-lambda
```bash
node-lambda deploy
```
also add your environment variables in the lambda management console:

- `DB_HOST` the RDS endpoint
- `DB_NAME` the name of the database to dump
- `DB_USER` the username
- `DB_PASSWORD` the password
- `S3_PATH` the name of the destination S3 bucket
