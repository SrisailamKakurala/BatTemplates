import { db } from "@/firebase/firebase.config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

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
  const structuresRef = collection(db, "structures");

  const templatesSnapshot = await getDocs(templatesRef);
  const structuresSnapshot = await getDocs(structuresRef);

  const templates = templatesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const structures = structuresSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  console.log("Fetched Templates:", templates); // Log templates
  console.log("Fetched structures:", structures); // Log structures

  // Filter bookmarked templates and structures
  const bookmarkedTemplates = templates.filter((template) =>
    bookmarks.includes(template.id)
  );

  const bookmarkedStructures = structures.filter((folder) =>
    bookmarks.includes(folder.id)
  );

  await updateDailyActivity();

  console.log("Filtered Bookmarked Templates:", bookmarkedTemplates); // Log filtered templates
  console.log("Filtered Bookmarked structures:", bookmarkedStructures); // Log filtered structures

  return { bookmarkedTemplates, bookmarkedStructures };
};
