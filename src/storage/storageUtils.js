const s3Bucket = require("./aws-s3");
const { v4 } = require("uuid");

const upload = (file, callback) => {
  const Key = v4();
  const image = s3Bucket.upload(
    {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key,
      Body: file.buffer,
    },
    (err, data) => {
      callback(err, data);
    }
  );
};
const get = (imageId, callback) => {
  if (imageId == null) {
    return s3Bucket.listObjectsV2(
      { Bucket: process.env.AWS_S3_BUCKET_NAME },
      (err, data) => {
        callback(err, data);
      }
    );
  }
  return s3Bucket.getObject(
    { Key: imageId, Bucket: process.env.AWS_S3_BUCKET_NAME },
    callback
  );
};
const deleteImage = (imageId, callback) => {
  return s3Bucket.deleteObject(
    { Key: imageId, Bucket: process.env.AWS_S3_BUCKET_NAME },
    callback
  );
};
module.exports = { upload, get, deleteImage };
