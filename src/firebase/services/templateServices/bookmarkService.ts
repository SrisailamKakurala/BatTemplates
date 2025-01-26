import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export const addBookmark = async (userId: string, templateId: string) => {
  try {
    const userDocRef = doc(db, "users", userId); // Reference to the user's document
    await updateDoc(userDocRef, {
      bookmarks: arrayUnion(templateId), // Add the template ID to the bookmarks array
    });
    console.log("Bookmark added successfully!");
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};
