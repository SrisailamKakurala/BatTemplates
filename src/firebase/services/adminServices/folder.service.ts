import { collection, query, where, getDocs } from "firebase/firestore"; // Import getDocs
import { db } from "@/firebase/firebase.config";

// Fetch pending folders directly from Firestore
export const fetchPendingFolders = async () => {
  const pendingQuery = query(
    collection(db, "folders"),
    where("isApproved", "==", false)
  );
  const querySnapshot = await getDocs(pendingQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
