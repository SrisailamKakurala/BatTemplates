import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

// 🔹 Fetch all users from Firestore
export const fetchUsersFromFirestore = async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id, // Include the document ID
    ...doc.data(), // Spread the document data
  }));
};

// 🔹 Fetch user roles from Firestore based on userId (using document ID)
export const fetchUserRoles = async (userId: string) => {
  try {
    // console.log("Fetching user roles for userId:", userId);
    
    // Directly reference the document by userId (which is the document ID)
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Access 'roles' from the document data
      // console.log("User roles:", userDoc.data().roles);
      return userDoc.data().roles || [];
    }

    return []; // If the document doesn't exist, return an empty array
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return []; // Return empty array on error
  }
};
