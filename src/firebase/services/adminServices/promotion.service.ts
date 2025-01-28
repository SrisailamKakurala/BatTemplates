// services/promotion.service.ts
import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const promoteUser = async (userId: string, role: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      roles: arrayUnion(role), // Add the role to the user's roles array
    });
  } catch (error) {
    console.error("Error promoting user:", error);
    throw error; // Re-throw to handle in the component
  }
};
