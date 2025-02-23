import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const toggleLike = async (templateId: string, userId: string, isLiked: boolean) => {
  try {
    const templateDocRef = doc(db, "templates", templateId);

    // Update likes array in Firestore
    if (isLiked) {
      await updateDoc(templateDocRef, {
        likes: arrayRemove(userId),
      });
    } else {
      await updateDoc(templateDocRef, {
        likes: arrayUnion(userId),
      });
    }

    // Fetch the updated document to get the latest likes array
    const updatedDoc = await getDoc(templateDocRef);
    const updatedLikesArray = updatedDoc.data()?.likes || [];

    // Log this action in daily activity
    await updateDailyActivity();

    return updatedLikesArray.length; // Return the updated likes count
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};
