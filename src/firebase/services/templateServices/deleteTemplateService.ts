import { db } from "@/firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

/**
 * Delete a template.
 * @param templateId - The ID of the template.
 */
export const deleteTemplate = async (templateId: string) => {
  try {
    const templateRef = doc(db, "templates", templateId);
    await deleteDoc(templateRef);
    return true;
  } catch (error) {
    console.error("Error deleting template:", error);
    return false;
  }
};
