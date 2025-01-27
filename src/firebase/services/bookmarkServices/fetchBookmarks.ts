import { db } from "@/firebase/firebase.config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// Fetch bookmarks for a user
export const fetchBookmarks = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("User not found.");
  }

  const bookmarks = userDoc.data().bookmarks || [];

  console.log("Fetched Bookmarks:", bookmarks); // Log bookmarks

  // Fetch details of bookmarked templates and folders
  const templatesRef = collection(db, "templates");
  const foldersRef = collection(db, "folders");

  const templatesSnapshot = await getDocs(templatesRef);
  const foldersSnapshot = await getDocs(foldersRef);

  const templates = templatesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const folders = foldersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  console.log("Fetched Templates:", templates); // Log templates
  console.log("Fetched Folders:", folders); // Log folders

  // Filter bookmarked templates and folders
  const bookmarkedTemplates = templates.filter((template) =>
    bookmarks.includes(template.id)
  );

  const bookmarkedFolders = folders.filter((folder) =>
    bookmarks.includes(folder.id)
  );

  console.log("Filtered Bookmarked Templates:", bookmarkedTemplates); // Log filtered templates
  console.log("Filtered Bookmarked Folders:", bookmarkedFolders); // Log filtered folders

  return { bookmarkedTemplates, bookmarkedFolders };
};
