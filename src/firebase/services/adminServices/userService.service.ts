import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export const fetchUsersFromFirestore = async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => doc.data());
};
