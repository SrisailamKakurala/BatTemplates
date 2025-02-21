import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface UpdateProfileData {
  name: string;
  location: string;
  personalLinks: { platform: string; url: string }[];
}

export const updateProfile = async (userId: string, data: UpdateProfileData) => {
  try {
    console.log("Updating profile for user:", data);
    const userRef = doc(db, "users", userId); // Reference to the user document

    // Correctly structured update data
    const updateData = {
      name: data.name,
      location: data.location,
      personalLinks: data.personalLinks, // Replace the entire array
    };

    await updateDoc(userRef, updateData); // Update Firestore document

    // Fetch and return the updated user data
    const updatedUserDoc = await getDoc(userRef);
    if (!updatedUserDoc.exists()) {
      throw new Error("User document not found after update.");
    }

    const updatedUser = updatedUserDoc.data();
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Re-throw error for handling in UI
  }
};
