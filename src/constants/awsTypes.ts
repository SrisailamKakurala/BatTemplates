export interface AwsConfig {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
}
  
export interface UploadFileParams {
    file: File;
    templateId: string;
}
  