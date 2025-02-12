import React, { useState } from "react";
import { uploadFileToS3 } from "@/aws/services/uploadToS3.service";

const UploadFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    
    setLoading(true);
    const uploadedUrl = await uploadFileToS3(file);
    setLoading(false);

    if (uploadedUrl) {
      setFileUrl(uploadedUrl);
    } else {
      alert("File upload failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto text-white">
      <h2 className="text-2xl font-bold">Upload File to AWS S3</h2>

      <input
        type="file"
        accept=".bat,.sh,.zh"
        onChange={handleFileChange}
        className="bg-gray-800 p-2 rounded border border-gray-600 cursor-pointer"
      />

      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white shadow transition"
        disabled={!file || loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {fileUrl && (
        <div className="text-center">
          <p className="text-green-400 font-semibold">Upload Successful! ✅</p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline mt-2 block"
          >
            Download File
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
