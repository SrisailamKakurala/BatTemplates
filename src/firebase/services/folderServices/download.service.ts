import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const incrementDownloadCount = async (folderId: string) => {
    if (!folderId) return;

    console.log(folderId)

    try {
        const folderRef = doc(db, "structures", folderId);

        await updateDoc(folderRef, { downloads: increment(1) });

        await updateDailyActivity();

    } catch (error) {
        console.error("Failed to increment download count:", error);
    }
};
