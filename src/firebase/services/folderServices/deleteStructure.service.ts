import { db } from "@/firebase/firebase.config";
import { doc, deleteDoc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";

/**
 * Delete a structure and remove it from the author's contributions array.
 * @param structureId - The ID of the structure.
 */
export const deleteStructure = async (structureId: string) => {
  try {
    const structureRef = doc(db, "structures", structureId);
    
    // Fetch the structure details before deletion
    const structureSnap = await getDoc(structureRef);
    if (!structureSnap.exists()) {
      console.error("❌ Structure not found");
      return false;
    }

    const structureData = structureSnap.data();
    const authorId = structureData?.authorId;

    // Step 1: Delete the structure
    await deleteDoc(structureRef);

    // Step 2: Remove structure from user's contributions array
    const userRef = doc(db, "users", authorId);
    await updateDoc(userRef, {
      contributions: arrayRemove({ id: structureId, type: "structure" }),
    });

    // Step 3: Log the deletion
    await addLogToFirestore({
      action: "🗑️ Structure Deleted",
      userId: structureData?.authorId,
      userEmail: structureData.authorEmail,
      details: `
        User: ${structureData.authorId}
        Deleted Structure: ${structureData.title}
        Structure ID: ${structureId}
        Time: ${new Date().toLocaleTimeString()}
      `,
    });

    console.log("✅ Structure deleted and removed from contributions.");
    return true;
  } catch (error) {
    console.error("🚨 Error deleting structure:", error);
    return false;
  }
};
