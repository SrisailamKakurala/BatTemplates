import { db } from "@/firebase/firebase.config";
import { collection, addDoc, getDocs, getDoc, updateDoc, doc, deleteDoc, serverTimestamp, query, where, orderBy  } from "firebase/firestore";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";
import { getUser } from "@/utils/localStorageUtil";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

const FLAG_COLLECTION = "flaggedContent";

/**
 * Flag a template or content
 * @param contentId - The ID of the content being flagged
 * @param userId - The ID of the user flagging the content
 * @param reason - The reason for flagging
 * @param type - Type of flagged content (e.g., "template", "comment", "profile")
 */
export const flagContent = async (
  contentId: string,
  userId: string,
  flaggedBy: string,
  reason: string,
  type: string,
  title: string,
  source?: string
) => {
  try {
    // Add the flagged content to Firestore
    const docRef = await addDoc(collection(db, "flaggedContent"), {
      contentId,
      userId,
      flaggedBy,
      reason,
      status: "pending",
      type,
      title,
      source,
      flaggedAt: serverTimestamp(),
    });

    // Now update the document with its generated ID
    const docRefWithId = doc(db, "flaggedContent", docRef.id); // Get the document reference with the generated ID
    await updateDoc(docRefWithId, { contentId: docRef.id });

    // Log the flagging action
    const user = getUser();
    if (user) {
      // Log flagging action with relevant details
      await addLogToFirestore({
        action: "🚩 Content Flagged",
        userId: user?.id,
        userEmail: user?.email,
        details: `
            Content with ID: ${contentId} 
            type: ${type}
            flagged by ${flaggedBy} 
            for reason: ${reason}
            Time: ${new Date().toLocaleTimeString()}
            `,
      });
    }

    await updateDailyActivity();

    return true;
  } catch (error) {
    console.error("Error flagging content:", error);
    return false;
  }
};

/**
 * Get all flagged content (Admin Only), sorted by recent flags first.
 */
export const getFlaggedContent = async () => {
  try {
    // Query flagged content, excluding "resolved" and ordering by flaggedAt (recent first)
    const q = query(
      collection(db, FLAG_COLLECTION),
      where("status", "!=", "resolved"),
      orderBy("flaggedAt", "desc") // Order by flaggedAt (most recent first)
    );

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
export const updateFlagStatus = async (flagId: string, status: string) => {
  try {
    const flagRef = doc(db, "flaggedContent", flagId); // Assuming your collection is "flaggedContent"
    
    // Fetch the flag data to get additional info (optional for log details)
    const flagDoc = await getDoc(flagRef);
    const flagData = flagDoc.data();
    
    if (flagData) {
      const { contentId, title, reason } = flagData;


      status === "resolved" ? await deleteDoc(doc(db, FLAG_COLLECTION, flagId)) : null;

      // Log the status update action
      const user = getUser();
      if (user) {
        await addLogToFirestore({
          action: `👍 Flag Status Updated to - ${status}`, // Action name
          userId: user.id,
          userEmail: user.email,
          details: `
                Flag ID: ${flagId} status changed to ${status} 
                By: ${user?.email}
                Flagged Content ID: ${contentId} 
                Title: ${title} 
                Reason: ${reason}
                Time: ${new Date().toLocaleTimeString()}`,
        });
      }
    }

    await updateDailyActivity();
    
    return true;
  } catch (error) {
    console.error("Error updating flag status:", error);
    return false;
  }
};
