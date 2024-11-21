const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function sendBufferToS3(fileName, fileBuffer) {
  console.log('Creating S3 client...');
  const s3Client = new S3Client({
    endpoint: process.env.S3_BUCKET_ENDPOINT,
    forcePathStyle: !!process.env.S3_BUCKET_ENDPOINT,
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });
  console.log(`S3 client created. Uploading ${fileName}...`);
  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
  });
  const result = await s3Client.send(uploadCommand);
  console.log('Upload complete');
  return result;
}

module.exports = sendBufferToS3;
