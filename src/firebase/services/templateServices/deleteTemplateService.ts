import { db } from "@/firebase/firebase.config";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";

/**
 * Delete a template.
 * @param templateId - The ID of the template.
 */
export const deleteTemplate = async (templateId: string) => {
  try {
    const templateRef = doc(db, "templates", templateId);
    
    // Fetch the template details before deletion
    const templateSnap = await getDoc(templateRef);
    if (!templateSnap.exists()) {
      console.error("Template not found");
      return false;
    }

    const templateData = templateSnap.data();

    // Delete the template
    await deleteDoc(templateRef);

    // Log the deletion
    await addLogToFirestore({
      action: "🗑️ Template Deleted",
      userId: templateData.authorId,
      userEmail: templateData.authorEmail,
      details: `
        User: ${templateData.author}
        Deleted Template: ${templateData.title}
        Template ID: ${templateId}
        Time: ${new Date().toLocaleTimeString()}
      `,
    });

    return true;
  } catch (error) {
    console.error("Error deleting template:", error);
    return false;
  }
};
