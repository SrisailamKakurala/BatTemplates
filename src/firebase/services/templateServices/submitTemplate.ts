import { db } from "@/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { Template } from "@/constants/schema";

export const submitTemplate = async (
  templateData: Template,
  addToast: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void
) => {
  try {
    const templatesRef = collection(db, "templates");
    await addDoc(templatesRef, templateData);
    addToast("Template submitted successfully!", "success");
  } catch (error) {
    console.error("Error submitting template:", error);
    addToast("Failed to submit the template. Try again.", "error");
    throw error; // Re-throw the error for handling in the component
  }
};