import { 
    collection, doc, getDocs, getDoc, setDoc, updateDoc, increment, query 
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { TopContributor } from "@/constants/schema";

// 📌 Utility function to get today's date in YYYY-MM-DD format
const getCurrentDate = (): string => new Date().toISOString().split("T")[0];

// 📌 Get total number of users
const getTotalUsers = async (): Promise<number> => {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.size;
};

// 📌 Get role distribution (count users per role)
const getRoleDistribution = async (): Promise<Record<string, number>> => {
    const snapshot = await getDocs(collection(db, "users"));
    const rolesCount: Record<string, number> = {};

    snapshot.forEach((doc) => {
        const user = doc.data() as { roles: string[] }; // Explicitly define type
        user.roles.forEach((role: string) => {
            rolesCount[role] = (rolesCount[role] || 0) + 1;
        });
    });

    return rolesCount;
};

// 📌 Get top 5 contributors (users with the most contributions)
const getTopContributors = async (): Promise<TopContributor[]> => {
    const snapshot = await getDocs(query(collection(db, "users")));

    // Map users and sort them based on contributions length
    const sortedContributors = snapshot.docs
        .map((doc) => {
            const data = doc.data() as { contributions: Array<{ id: string; type: "template" | "folder"; name: string }> };
            return {
                id: doc.id,
                contributions: data.contributions?.length || 0, // Use array length
            };
        })
        .sort((a, b) => b.contributions - a.contributions) // Sort by contributions count (descending)
        .slice(0, 2); // Get the top 3

    return sortedContributors;
};

// 📌 Prepare an update for today's new users count
const getNewUsersTodayUpdate = (): Record<string, any> => ({
    [`newUsersPerDay.${getCurrentDate()}`]: increment(1),
});

// 📌 Update Users Analytics in Firestore
export const updateUsersAnalytics = async () => {
    const usersAnalyticsRef = doc(db, "analytics", "users");

    try {
        const [totalUsers, rolesDistribution, topContributors] = await Promise.all([
            getTotalUsers(),
            getRoleDistribution(),
            getTopContributors(),
        ]);

        const newUsersTodayUpdate = getNewUsersTodayUpdate();
        const docSnap = await getDoc(usersAnalyticsRef);

        if (!docSnap.exists()) {
            // Initialize analytics if not present
            await setDoc(usersAnalyticsRef, {
                totalUsers,
                newUsersPerDay: { [getCurrentDate()]: 1 },
                topContributors,
                rolesDistribution,
            });
        } else {
            // Update existing analytics
            await updateDoc(usersAnalyticsRef, {
                totalUsers,
                rolesDistribution,
                topContributors,
                ...newUsersTodayUpdate,
            });
        }

        console.log(topContributors, totalUsers, rolesDistribution);

        console.log("✅ Users analytics updated successfully!");
    } catch (error) {
        console.error("❌ Failed to update users analytics:", error);
    }
};

