// services/demotion.service.ts
import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

export const demoteUser = async (userId: string, role: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      roles: arrayRemove(role), // Remove the role from the user's roles array
    });
  } catch (error) {
    console.error("Error demoting user:", error);
    throw error; // Re-throw to handle in the component
  }
};
