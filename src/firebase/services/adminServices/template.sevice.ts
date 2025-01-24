import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; // Import getDocs
import { db } from "@/firebase/firebase.config";

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
      console.log(doc.id, doc.data()); // Check if 'isApproved' is correct
    });
  }

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Approve a template by ID
export const approveTemplate = async (templateId: string) => {
  const templateRef = doc(db, "templates", templateId);
  await updateDoc(templateRef, {
    isApproved: true,
    reviewedAt: new Date().toISOString(), // Add a reviewedAt timestamp
  });
};