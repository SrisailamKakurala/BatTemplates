import { collection, query, where, getDocs } from "firebase/firestore"; // Import getDocs
import { db } from "@/firebase/firebase.config";

// Fetch pending templates directly from Firestore
export const fetchPendingTemplates = async () => {
  const pendingQuery = query(
    collection(db, "templates"),
    where("isApproved", "==", false)
  );
  const querySnapshot = await getDocs(pendingQuery); // Use getDocs instead of get()
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch history templates directly from Firestore
export const fetchHistoryTemplates = async () => {
  const historyQuery = query(
    collection(db, "templates"),
    where("isApproved", "==", true)
  );
  const querySnapshot = await getDocs(historyQuery); // Use getDocs instead of get()
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
