import { doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const viewHandler = async (templateId: string, githubLink: string) => {
    if (!templateId) return;

    window.open(githubLink, "_blank");

    const templateRef = doc(db, "templates", templateId);
    const globalAnalyticsRef = doc(db, "analytics", "global");

    try {
        // Ensure the global analytics document exists before updating
        const docSnap = await getDoc(globalAnalyticsRef);
        if (!docSnap.exists()) {
            await setDoc(globalAnalyticsRef, {
                totalUsers: 0,
                totalTemplates: 0,
                totalStructures: 0,
                totalViews: 1, // Initialize with 1 view
                totalDownloads: 0,
                dailyActivity: {},
            });
        } else {
            await updateDoc(globalAnalyticsRef, { totalViews: increment(1) });
        }

        // Increment views for the template
        await updateDoc(templateRef, { views: increment(1) });

        // Log this action in daily activity
        await updateDailyActivity();
    } catch (error) {
        console.error("Failed to update global views:", error);
    }
};
