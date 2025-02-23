import { doc, updateDoc, increment, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

// Utility function to get the current date in YYYY-MM-DD format
const getCurrentDate = (): string => {
    return new Date().toISOString().split("T")[0]; // e.g., "2025-02-23"
};

// Function to count documents in a Firestore collection
const getCollectionCount = async (collectionName: string): Promise<number> => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.size; // Returns the number of documents in the collection
};

export const updateDailyActivity = async () => {
    const globalAnalyticsRef = doc(db, "analytics", "global");
    const currentDate = getCurrentDate();

    try {
        // Fetch the latest counts for users, templates, and structures
        const [totalUsers, totalTemplates, totalStructures] = await Promise.all([
            getCollectionCount("users"),
            getCollectionCount("templates"),
            getCollectionCount("structures"),
        ]);

        // Check if the global analytics document exists
        const docSnap = await getDoc(globalAnalyticsRef);

        if (!docSnap.exists()) {
            // If the document does not exist, create it with initial values
            await setDoc(globalAnalyticsRef, {
                totalUsers,
                totalTemplates,
                totalStructures,
                totalViews: 0,
                totalDownloads: 0,
                dailyActivity: { [currentDate]: 1 }, // Initialize today's count
            });
        } else {
            // If the document exists, update counts and increment today's activity
            await updateDoc(globalAnalyticsRef, {
                totalUsers,
                totalTemplates,
                totalStructures,
                [`dailyActivity.${currentDate}`]: increment(1),
            });
        }
    } catch (error) {
        console.error("Failed to update daily activity:", error);
    }
};
