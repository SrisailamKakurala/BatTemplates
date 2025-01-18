import { collection, query, where, getDocs } from "firebase/firestore"; // Import getDocs
import { db } from "@/firebase/firebase.config";

// Fetch pending folders directly from Firestore
export const fetchPendingFolders = async () => {
  const pendingQuery = query(
    collection(db, "folders"),
    where("isApproved", "==", false)
  );
  const querySnapshot = await getDocs(pendingQuery); // Use getDocs instead of get()
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch history folders directly from Firestore
export const fetchHistoryFolders = async () => {
  const historyQuery = query(
    collection(db, "folders"),
    where("isApproved", "==", true)
  );
  const querySnapshot = await getDocs(historyQuery); // Use getDocs instead of get()
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
