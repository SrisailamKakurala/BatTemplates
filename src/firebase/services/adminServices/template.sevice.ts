import { collection, query, where, getDocs } from "firebase/firestore"; // Import getDocs
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

