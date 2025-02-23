import { db } from "@/firebase/firebase.config";
import { doc, deleteDoc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

/**
 * Delete a template and remove it from the author's contributions array.
 * @param templateId - The ID of the template.
 */
export const deleteTemplate = async (templateId: string) => {
  try {
    const templateRef = doc(db, "templates", templateId);
    
    // Fetch the template details before deletion
    const templateSnap = await getDoc(templateRef);
    if (!templateSnap.exists()) {
      console.error("❌ Template not found");
      return false;
    }

    const templateData = templateSnap.data();
    const authorId = templateData.authorId;

    // Step 1: Delete the template
    await deleteDoc(templateRef);

    // Step 2: Remove template from user's contributions array
    const userRef = doc(db, "users", authorId);
    await updateDoc(userRef, {
      contributions: arrayRemove({ id: templateId, type: "template" }),
    });

    // Step 3: Log the deletion
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

    // Log this action in daily activity
    await updateDailyActivity();

    console.log("✅ Template deleted and removed from contributions.");
    return true;
  } catch (error) {
    console.error("🚨 Error deleting template:", error);
    return false;
  }
};
