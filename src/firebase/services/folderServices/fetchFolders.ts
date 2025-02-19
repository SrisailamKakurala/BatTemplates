import { doc, getDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

/**
 * Fetch all pending folders (not yet approved).
 * @returns {Promise<any[]>} - Array of pending folders.
 */
export const fetchPendingFolders = async (): Promise<any[]> => {
  const foldersRef = collection(db, "structures");

  // Query to get folders where 'isApproved' is false, ordered by 'createdAt' (newest first)
  const q = query(foldersRef, where("isApproved", "==", false), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  const folders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return folders;
};


/**
 * Fetch a single folder by its ID.
 * @param folderId - The ID of the folder.
 * @returns The folder data.
 */
export const fetchFolderById = async (folderId: string) => {
  const folderRef = doc(db, "structures", folderId);
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
