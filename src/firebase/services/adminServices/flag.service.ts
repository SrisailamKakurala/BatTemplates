import { db } from "@/firebase/firebase.config";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, serverTimestamp, query, where } from "firebase/firestore";

const FLAG_COLLECTION = "flaggedContent";

/**
 * Flag a template or content
 * @param contentId - The ID of the content being flagged
 * @param userId - The ID of the user flagging the content
 * @param reason - The reason for flagging
 * @param type - Type of flagged content (e.g., "template", "comment", "profile")
 */
export const flagContent = async (contentId: string, userId: string, flaggedBy: string, reason: string, type: string, title: string, githubLink: string) => {
    try {
      // Add the document with a placeholder ID
      const docRef = await addDoc(collection(db, "flaggedContent"), {
        contentId,
        userId,
        flaggedBy,
        reason,
        type,
        title,
        githubLink,
        flaggedAt: serverTimestamp(),
      });
  
      // Now update the document with its generated ID
      const docRefWithId = doc(db, "flaggedContent", docRef.id); // Get the document reference with the generated ID
      await updateDoc(docRefWithId, { contentId: docRef.id });
  
      return true;
    } catch (error) {
      console.error("Error flagging content:", error);
      return false;
    }
  };

/**
 * Get all flagged content (Admin Only)
 */
export const getFlaggedContent = async () => {
  try {
    // Create a query to get only content whose status is not 'resolved'
    const q = query(collection(db, FLAG_COLLECTION), where("status", "!=", "resolved"));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching flagged content:", error);
    return [];
  }
};

/**
 * Update the status of a flagged item (Admin Only)
 * @param flagId - The ID of the flagged content
 * @param status - New status ("resolved", "rejected")
 */
export const updateFlagStatus = async (flagId: string, status: "resolved" | "rejected") => {
  try {
    const flagRef = doc(db, FLAG_COLLECTION, flagId);
    await updateDoc(flagRef, { status });
    return true;
  } catch (error) {
    console.error("Error updating flag status:", error);
    return false;
  }
};

/**
 * Delete flagged content (Admin Only)
 * @param flagId - The ID of the flagged content to delete
 */
export const deleteFlaggedContent = async (flagId: string) => {
  try {
    await deleteDoc(doc(db, FLAG_COLLECTION, flagId));
    return true;
  } catch (error) {
    console.error("Error deleting flagged content:", error);
    return false;
  }
};
