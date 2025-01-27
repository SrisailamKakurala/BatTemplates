import { collection, query, where, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
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

// Approve a template by ID
export const approveTemplate = async (templateId: string, authorId: string) => {
  try {
    // Step 1: Add the user's ID to the 'contributors' collection
    const contributorRef = doc(db, "contributors", authorId);
    await setDoc(contributorRef, { userId: authorId }, { merge: true }); // Add user ID if not already there

    // Step 2: Approve the template and update the reviewedAt field
    const templateRef = doc(db, "templates", templateId);
    const reviewedAt = formatDate(Date.now() / 1000); // Use current time and convert to seconds

    await updateDoc(templateRef, {
      isApproved: true,
      reviewedAt, // Set the formatted date
    });

    console.log("Template approved and contributor added successfully.");
  } catch (error) {
    console.error("Error approving template: ", error);
  }
};