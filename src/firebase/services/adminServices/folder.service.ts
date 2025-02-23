import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; // Import getDocs
import { db } from "@/firebase/firebase.config";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";
import formatDate from "@/utils/formatDate";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

// Fetch pending folders directly from Firestore
export const fetchPendingFolders = async () => {
  const pendingQuery = query(
    collection(db, "structures"),
    where("isApproved", "==", false)
  );
  const querySnapshot = await getDocs(pendingQuery);
  console.log(querySnapshot)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};



export const approveStructure = async (
  structureId: string,
  authorId: string,
  authorEmail: string,
  approvedByEmail: string
) => {
  try {
    console.log("✅ Approving structure with ID:", structureId, "-", authorId);

    const contributorRef = doc(db, "contributors", authorId);
    const contributorSnap = await getDoc(contributorRef);

    if (!contributorSnap.exists()) {
      // If user is not in contributors, add them
      await setDoc(contributorRef, { userId: authorId }, { merge: true });

      // 🔹 Log new contributor
      await addLogToFirestore({
        action: "🎉 New Contributor",
        userId: authorId,
        userEmail: authorEmail,
        details: `
          User ${authorEmail} is now a contributor!
          Approved by: ${approvedByEmail}
          Time: ${new Date().toLocaleTimeString()}
        `,
      });
    }

    // Step 2: Approve the structure and update the reviewedAt field
    const structureRef = doc(db, "structures", structureId);
    const reviewedAt = formatDate(Date.now() / 1000); // Convert timestamp

    await updateDoc(structureRef, {
      isApproved: true,
      reviewedAt, // Set the formatted date
    });

    // Step 3: Add the structure ID to the author's contributions array with type "structure"
    const userRef = doc(db, "users", authorId);
    await updateDoc(userRef, {
      contributions: arrayUnion({
        id: structureId,
        type: "structure",
      }),
    });

    // 🔹 Log structure approval
    await addLogToFirestore({
      action: "✅ Structure Approved",
      userId: authorId,
      userEmail: authorEmail,
      details: `
        Structure: ${structureId} has been approved!
        Approved by: ${approvedByEmail}
        Time: ${new Date().toLocaleTimeString()}
      `,
    });

    await updateDailyActivity();

    console.log("✅ Structure approved, contributor added (if not already), and user contributions updated successfully.");
  } catch (error) {
    console.error("❌ Error approving structure:", error);
  }
};