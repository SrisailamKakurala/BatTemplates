import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const toggleBookmark = async (folderId: string, userId: string, isBookmarked: boolean) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            bookmarks: isBookmarked ? arrayRemove(folderId) : arrayUnion(folderId),
        });
        await updateDailyActivity();
    } catch (error) {
        console.error("Error toggling bookmark:", error);
    }
};
