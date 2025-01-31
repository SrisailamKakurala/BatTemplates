// import { doc, setDoc } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// // import { db, storage } from "@/firebase/firebase.config"; // Assuming you have Firebase initialized

// interface SettingsProps {
//   siteName: string;
//   siteDescription: string;
//   since: string;
//   guidelines: string;
//   logo: string | null;
// }

export const saveSiteSettings = () => {}

// export const saveSiteSettings = async (
//   settings: Partial<SettingsProps>,
//   logo: File | null
// ) => {
//   // let logoUrl = null;

// //   // If a logo file is provided, upload it to Firebase Storage
// //   if (logo) {
// //     logoUrl = await uploadLogoToStorage(logo); // Get the URL after uploading
// //   }

// //   // Save the settings along with the logo URL (if uploaded)
// //   const settingsRef = doc(db, "settings", "siteInfo");
// //   await setDoc(settingsRef, {
// //     ...settings,
// //     logo: logoUrl,
// //   });
// };

// // // Function to handle logo upload to Firebase Storage
// // const uploadLogoToStorage = async (logoFile: File): Promise<string> => {
// //   const storageRef = ref(storage, `logos/${logoFile.name}`); // Use a unique path
// //   await uploadBytes(storageRef, logoFile); // Upload the file
// //   const logoUrl = await getDownloadURL(storageRef); // Get the download URL
// //   return logoUrl;
// // };
