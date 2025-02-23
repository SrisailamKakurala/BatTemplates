import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { Folder } from "@/constants/schema";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const updateFolder = async (folderId: string, updatedData: Partial<Folder>) => {
    if (!folderId || !updatedData) return;

    try {
        const folderRef = doc(db, "structures", folderId);
        await updateDoc(folderRef, updatedData);
        await updateDailyActivity();
    } catch (error) {
        console.error("Failed to update folder:", error);
        throw error;
    }
};
