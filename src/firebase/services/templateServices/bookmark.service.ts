import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const addBookmark = async (userId: string, templateId: string) => {
  try {
    const userDocRef = doc(db, "users", userId); // Reference to the user's document
    await updateDoc(userDocRef, {
      bookmarks: arrayUnion(templateId), // Add the template ID to the bookmarks array
    });
    console.log("Bookmark added successfully!");

    // Log this action in daily activity
    await updateDailyActivity();
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};
