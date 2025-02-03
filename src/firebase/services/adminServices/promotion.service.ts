import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service"; // Import the log service
import { getUser } from "@/utils/localStorageUtil";

export const promoteUser = async (userId: string, role: string, email: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      roles: arrayUnion(role), // Add the role to the user's roles array
    });

    // Log the promotion action
    const user = getUser();
    if (user) {
      await addLogToFirestore({
        action: "🌟 User Promoted",
        userId: userId, // Admin ID who promoted the user
        userEmail: email, // Admin email
        details: `
                User ${email} has been promoted 
                to the role of ${role} 
                by ADMIN ${user.email}
                `,
      });
    }
  } catch (error) {
    console.error("Error promoting user:", error);
    throw error; // Re-throw to handle in the component
  }
};
