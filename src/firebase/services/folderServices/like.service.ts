import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export const toggleLike = async (folderId: string, userId: string, isLiked: boolean) => {
  try {
    const folderDocRef = doc(db, "structures", folderId);

    // Update likes array in Firestore
    if (isLiked) {
      await updateDoc(folderDocRef, {
        likes: arrayRemove(userId),
      });
    } else {
      await updateDoc(folderDocRef, {
        likes: arrayUnion(userId),
      });
    }

    // Fetch the updated document to get the latest likes array
    const updatedDoc = await getDoc(folderDocRef);
    const updatedLikesArray = updatedDoc.data()?.likes || [];

    return updatedLikesArray.length; // Return the updated likes count
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};
