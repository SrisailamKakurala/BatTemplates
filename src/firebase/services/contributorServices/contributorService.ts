//contributorService.ts
import { db } from "@/firebase/firebase.config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export const fetchContributors = async () => {
  try {
    // Step 1: Get the list of contributors (userId's)
    const contributorsRef = collection(db, "contributors");
    const contributorsSnapshot = await getDocs(contributorsRef);

    const userIds: string[] = contributorsSnapshot.docs.map((doc) => doc.id);

    // Step 2: Fetch user details for each userId
    const userDetailsPromises = userIds.map(async (userId) => {
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return { id: userSnapshot.id, ...userSnapshot.data() };
      }
      return null;
    });

    const userDetails = await Promise.all(userDetailsPromises);
    // Remove any nulls (in case any user doesn't exist)
    const validUserDetails = userDetails.filter((user) => user !== null);
    console.log(validUserDetails)
    return validUserDetails;
  } catch (error) {
    console.error("Error fetching contributors:", error);
    throw error; // Re-throw error to handle it in the component if necessary
  }
};

