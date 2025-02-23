import { db } from "@/firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadFileToS3, uploadMultipleFilesToS3 } from "@/aws/services/uploadFilesToS3.service";
import { Folder } from "@/constants/schema";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

/**
 * Uploads folder data to Firestore.
 * @param folderData - Metadata of the folder.
 * @param file - The single script file (.sh or .bat).
 * @param images - Array of image files.
 * @param userId - User ID.
 * @param userEmail - User Email.
 * @returns {Promise<string | null>} - The document ID if successful, otherwise null.
 */
export const uploadFolderStructure = async (
  folderData: Partial<Folder>,
  file: File | null,
  images: File[],
  userId: string,
  userEmail: string
): Promise<string | null> => {
  try {
    // Upload the script file first (only one allowed)
    const downloadLink = file ? await uploadFileToS3(file) : null;

    // Upload images to AWS
    const imageUrls = await uploadMultipleFilesToS3(images);

    // Save to Firestore
    const folderRef = await addDoc(collection(db, "structures"), {
      ...folderData,
      downloadLink, // Store script file link
      images: imageUrls,
      createdAt: serverTimestamp(),
      authorId: userId,
      authorEmail: userEmail,
      isApproved: false,
      downloads: 0,
      likes: [],
      discussions: [],
    });

    await updateDailyActivity();

    return folderRef.id;
  } catch (error) {
    console.error("Error uploading folder structure:", error);
    return null;
  }
};
