import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const toggleBookmark = async (folderId: string, userId: string, isBookmarked: boolean) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            bookmarks: isBookmarked ? arrayRemove(folderId) : arrayUnion(folderId),
        });
    } catch (error) {
        console.error("Error toggling bookmark:", error);
    }
};
