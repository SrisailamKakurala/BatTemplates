import { doc, setDoc } from "firebase/firestore"; // Firestore functions to save data
import { db } from "@/firebase/firebase.config"; // Firebase configuration (assuming db is exported from here)

interface SettingsProps {
  siteName: string;
  siteDescription: string;
  since: string;
  guidelines: string;
}

// Function to save site settings (no logo handling)
export const saveSiteSettings = async (settings: Partial<SettingsProps>) => {
  try {
    // Reference to the "settings" document in Firestore (the document ID is "siteInfo")
    const settingsRef = doc(db, "settings", "siteInfo");

    // Save the settings (without logo)
    await setDoc(settingsRef, settings);

    console.log("Settings saved successfully!");
  } catch (error) {
    console.error("Error saving settings:", error);
  }
};
