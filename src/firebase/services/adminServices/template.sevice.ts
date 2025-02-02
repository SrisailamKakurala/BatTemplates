import { collection, query, where, getDocs, doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import formatDate from "@/utils/formatDate";

// Fetch pending templates directly from Firestore
export const fetchPendingTemplates = async () => {
  const pendingQuery = query(
    collection(db, "templates"),
    where("isApproved", "==", false)
  );
  const querySnapshot = await getDocs(pendingQuery);

  if (querySnapshot.empty) {
    console.log("No pending templates found");
  } else {
    querySnapshot.docs.forEach(doc => {
      console.log(doc.id, doc.data());
    });
  }

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


// Approve a template by ID and update user contributions
export const approveTemplate = async (templateId: string, authorId: string) => {
  try {
    console.log("Approving template with ID:", templateId, "-", authorId);

    // Step 1: Add the user's ID to the 'contributors' collection
    const contributorRef = doc(db, "contributors", authorId);
    await setDoc(contributorRef, { userId: authorId }, { merge: true });

    // Step 2: Approve the template and update the reviewedAt field
    const templateRef = doc(db, "templates", templateId);
    const reviewedAt = formatDate(Date.now() / 1000); // Convert timestamp to formatted date

    await updateDoc(templateRef, {
      isApproved: true,
      reviewedAt, // Set the formatted date
    });

    // Step 3: Add the template ID to the author's contributions array with type "template"
    const userRef = doc(db, "users", authorId);
    await updateDoc(userRef, {
      contributions: arrayUnion({
        id: templateId,
        type: "template",
      }),
    });

    console.log("Template approved, contributor added, and user contributions updated successfully.");
  } catch (error) {
    console.error("Error approving template:", error);
  }
};
