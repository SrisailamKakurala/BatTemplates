import { db } from "@/firebase/firebase.config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { userTemplateProps, userFodlerProps } from "@/constants/interfaces";

// Fetch bookmarks for a user
export const fetchBookmarks = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("User not found.");
  }

  const bookmarks = userDoc.data().bookmarks || [];

  // Fetch details of bookmarked templates and folders
  const templatesRef = collection(db, "templates");
  const foldersRef = collection(db, "folders");

  const templatesSnapshot = await getDocs(templatesRef);
  const foldersSnapshot = await getDocs(foldersRef);

  const templates = templatesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as userTemplateProps));
  const folders = foldersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as userFodlerProps));

  // Filter bookmarked templates and folders
  const bookmarkedTemplates = templates.filter((template) =>
    bookmarks.includes(template.id) && template.type === "template"
  );

  const bookmarkedFolders = folders.filter((folder) =>
    bookmarks.includes(folder.id) && folder.type === "folder"
  );

  return { bookmarkedTemplates, bookmarkedFolders };
};