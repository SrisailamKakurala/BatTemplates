import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

/**
 * Fetch a single folder by its ID.
 * @param folderId - The ID of the folder.
 * @returns The folder data.
 */
export const fetchFolderById = async (folderId: string) => {
  const folderRef = doc(db, "folders", folderId);
  const folderSnapshot = await getDoc(folderRef);

  if (folderSnapshot.exists()) {
    return { id: folderSnapshot.id, ...folderSnapshot.data() };
  } else {
    console.error(`Folder with ID ${folderId} not found`);
    return null;
  }
};

/**
 * Fetch multiple folders by an array of IDs.
 * @param folderIds - Array of folder IDs.
 * @returns An array of folders.
 */
export const fetchFoldersByIds = async (folderIds: string[]) => {
  const folders: any[] = [];

  for (const folderId of folderIds) {
    const folder = await fetchFolderById(folderId);
    if (folder) folders.push(folder);
  }

  return folders;
};
