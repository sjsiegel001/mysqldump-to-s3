"use strict";

const AWS = require('aws-sdk');
const tar = require('tar');
const moment = require('moment-timezone');
const fs = require('fs');

const msd = require('mysqldump');

AWS.config.update({region: 'us-east-2'});
moment.locale('us');
moment.tz.setDefault("America/New_York");

const db_datestringed_name = 'db_backup_' + moment().format('_MM-DD-YYYY_hhmmA');
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

exports.handler = function(event, context, callback) {

  new Promise(function(resolve, reject) {

    msd({
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        },
        dumpToFile: '/tmp/' + db_datestringed_name + '.sql',
    }).then(resolve(1))

  }).then(function(result) {


    tar.c(
      {
        gzip: true,
        file: '/tmp/' + db_datestringed_name + '.tgz'
      },
      ['/tmp/' + db_datestringed_name + '.sql']
    ).then(_ => { console.log('tarball created'); })

  }).then(function(result) {

    fs.readFile('/tmp/' + db_datestringed_name + '.tgz', function(err, data) {
      if (err) throw err;

      var base64data = new Buffer.from(data, 'binary');
      s3.putObject({
        Bucket: process.env.S3_PATH,
        Key: db_datestringed_name + '.tgz',
        Body: base64data,
      },function (resp) {

        console.log('Successfully uploaded backup to s3.');
      });
    });
  });
}
