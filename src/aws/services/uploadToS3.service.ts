import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { awsConfig } from "@/aws/aws.config";

/**
 * Initialize S3 Client
 */
const s3Client = new S3Client({
  region: awsConfig.region,
  credentials: {
    accessKeyId: awsConfig.accessKeyId!,
    secretAccessKey: awsConfig.secretAccessKey!,
  },
});

/**
 * Uploads a file to AWS S3.
 * @param file - The file to upload.
 * @returns {Promise<string | null>} - The uploaded file URL or null if failed.
 */
export const uploadFileToS3 = async (file: File): Promise<string | null> => {
  try {
    const fileKey = `uploads/${Date.now()}-${file.name}`; // Unique file name

    const params = {
      Bucket: awsConfig.bucketName,
      Key: fileKey,
      Body: file,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
