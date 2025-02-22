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
 * Converts a file to an ArrayBuffer for S3 upload.
 * @param file - The file to convert.
 * @returns {Promise<ArrayBuffer>}
 */
const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Uploads a file to AWS S3.
 * @param file - The file to upload.
 * @returns {Promise<string | null>} - The uploaded file URL or null if failed.
 */
export const uploadFileToS3 = async (file: File): Promise<string | null> => {
  try {
    const fileBuffer = await fileToArrayBuffer(file); // Convert file to ArrayBuffer
    const fileKey = `uploads/${Date.now()}-${file.name}`; // Unique file name

    const params = {
      Bucket: awsConfig.bucketName,
      Key: fileKey,
      Body: new Uint8Array(fileBuffer), // ✅ Convert ArrayBuffer to Uint8Array
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
