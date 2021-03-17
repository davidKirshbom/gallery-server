const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_S3_ID,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});
module.exports = s3;
