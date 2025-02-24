import { db } from "@/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import getStructuresAnalytics from "@/firebase/services/analytics/structuresAnalytics.service";
import getTemplatesAnalytics from "@/firebase/services/analytics/templatesAnalytics.service";
import { GlobalAnalytics, UsersAnalytics } from "@/constants/schema";


// Fetch Global Analytics
export const getGlobalAnalytics = async (): Promise<GlobalAnalytics | null> => {
    try {
        const docRef = doc(db, "analytics", "global");
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? (docSnap.data() as GlobalAnalytics) : null;
    } catch (error) {
        console.error("Error fetching global analytics:", error);
        return null;
    }
};

// Fetch User Analytics
export const getUserAnalytics = async (): Promise<UsersAnalytics | null> => {
    try {
        const docRef = doc(db, "analytics", "users");
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? (docSnap.data() as UsersAnalytics) : null;
    } catch (error) {
        console.error("Error fetching user analytics:", error);
        return null;
    }
};

// Fetch All Analytics
export const getAnalyticsData = async () => {
    const [global, users, templates, structures] = await Promise.all([
        getGlobalAnalytics(),
        getUserAnalytics(),
        getTemplatesAnalytics(),
        getStructuresAnalytics(),
    ]);

    return { global, users, templates, structures };
};
