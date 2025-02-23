import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const incrementDownloadCount = async (folderId: string) => {
    if (!folderId) return;

    try {
        const folderRef = doc(db, "structures", folderId);
        const globalAnalyticsRef = doc(db, "analytics", "global");

        await updateDoc(folderRef, { downloads: increment(1) });

        // Also update the totalDownloads in global analytics
        await updateDoc(globalAnalyticsRef, { totalDownloads: increment(1) });

        await updateDailyActivity();

    } catch (error) {
        console.error("Failed to increment download count:", error);
    }
};
