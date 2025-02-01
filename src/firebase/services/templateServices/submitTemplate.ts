import { db } from "@/firebase/firebase.config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Template } from "@/constants/schema";

export const submitTemplate = async (
  templateData: Template,
  addToast: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void
) => {
  try {
    const templatesRef = collection(db, "templates");
    
    // Add the document and get the document reference
    const docRef = await addDoc(templatesRef, templateData);
    
    // Set the doc ID in the template data
    const templateWithId = { ...templateData, id: docRef.id };
    
    // Update the document with the generated ID
    await setDoc(doc(db, "templates", docRef.id), templateWithId);
    
    addToast("Template submitted successfully!", "success");
    
    // Return the template with the added ID
    return templateWithId;
  } catch (error) {
    console.error("Error submitting template:", error);
    addToast("Failed to submit the template. Try again.", "error");
    throw error; // Re-throw the error for handling in the component
  }
};
