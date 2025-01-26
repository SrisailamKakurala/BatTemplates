import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface UpdateProfileData {
  name: string;
  location: string;
  personalLinks: { platform: string; url: string }[];
}

/**
 * Updates the user's profile data in Firestore.
 * @param userId - The ID of the user to update.
 * @param data - The updated profile data.
 */
export const updateProfile = async (userId: string, data: UpdateProfileData) => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user document

    // Flatten the personalLinks array into Firestore-compatible dot notation
    const flattenedData = {
      name: data.name,
      location: data.location,
      ...data.personalLinks.reduce((acc, link, index) => {
        acc[`personalLinks.${index}.platform`] = link.platform;
        acc[`personalLinks.${index}.url`] = link.url;
        return acc;
      }, {} as Record<string, any>),
    };

    await updateDoc(userRef, flattenedData); // Update the document with the flattened data
    
    // Fetch the updated user data from Firestore
    const updatedUserDoc = await getDoc(userRef);
    if (!updatedUserDoc.exists()) {
      throw new Error("User document not found after update.");
    }

    const updatedUser = updatedUserDoc.data();

    // Return the updated user data
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Re-throw the error for handling in the component
  }
};