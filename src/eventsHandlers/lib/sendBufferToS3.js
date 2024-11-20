const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function sendBufferToS3(fileName, fileBuffer) {
  const s3Client = new S3Client({
    endpoint: process.env.S3_BUCKET_ENDPOINT,
    forcePathStyle: !!process.env.S3_BUCKET_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });
  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
  })
  await s3Client.send(uploadCommand)
}

module.exports = sendBufferToS3;
