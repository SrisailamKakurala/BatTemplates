import { collection, query, where, getDocs } from "firebase/firestore"; // Import getDocs
import { db } from "@/firebase/firebase.config";

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


export const approveStructure = (id: string, authorId:string, authorEmail:string, userEmail:string) => {

}