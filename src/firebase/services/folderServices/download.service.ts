import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export const incrementDownloadCount = async (folderId: string) => {
    if (!folderId) return;

    try {
        const folderRef = doc(db, "structures", folderId);
        await updateDoc(folderRef, {
            downloads: increment(1),
        });
    } catch (error) {
        console.error("Failed to increment download count:", error);
    }
};
