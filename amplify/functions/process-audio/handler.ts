import type { Handler } from 'aws-lambda';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

export const handler: Handler = async (event, context) => {
  try {
    const s3Client = new S3Client({ region: context.invokedFunctionArn.split(':')[3] });
    const { bucket, key } = event.Records[0].s3.object;

    // Get the original file from S3
    const getCommand = new GetObjectCommand({
      Bucket: bucket.name,
      Key: key
    });

    const { Body } = await s3Client.send(getCommand);

    // TODO: Process the audio file
    // 1. Generate streaming version
    // 2. Generate preview version
    // 3. Generate waveform data

    // Upload processed files back to S3
    const putCommand = new PutObjectCommand({
      Bucket: bucket.name,
      Key: `processed/${key}`,
      Body: Body // This would be the processed audio
    });

    await s3Client.send(putCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Audio processed successfully' })
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};