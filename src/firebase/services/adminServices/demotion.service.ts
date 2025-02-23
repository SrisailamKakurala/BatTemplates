import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";
import { getUser } from "@/utils/localStorageUtil";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const demoteUser = async (userId: string, role: string, email: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      roles: arrayRemove(role), // Remove the role from the user's roles array
    });

    // Log the demotion action
    const user = getUser();
    if (user) {
      await addLogToFirestore({
        action: "🫂 User Demoted",
        userId: userId,
        userEmail: email,
        details: `
                User ${email} has been demoted 
                from the role of ${role} 
                by ADMIN ${user.email}
                `,
      });
    }

    await updateDailyActivity();
  } catch (error) {
    console.error("Error demoting user:", error);
    throw error; // Re-throw to handle in the component
  }
};
