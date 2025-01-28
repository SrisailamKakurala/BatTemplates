import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export const fetchUsersFromFirestore = async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(), // Spread the document data
  }));
};

