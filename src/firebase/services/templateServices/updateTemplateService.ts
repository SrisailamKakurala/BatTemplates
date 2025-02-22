import { db } from "@/firebase/firebase.config";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

/**
 * Update a template's details.
 * @param templateId - The ID of the template.
 * @param updatedData - The updated template data.
 */
export const updateTemplate = async (templateId: string, updatedData: Record<string, any>) => {
  try {
    const templateRef = doc(db, "templates", templateId);

    await updateDoc(templateRef, {
      ...updatedData,
      reviewedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating template:", error);
    return false;
  }
};
