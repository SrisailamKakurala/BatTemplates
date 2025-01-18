import { redisClient } from "@/firebase/firebase.config";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const fetchWithCache = async (
  cacheKey: string,
  firestoreQuery: any // Use appropriate type if available for Firestore query
) => {
  try {
    // Check Redis for cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // If no cache, fetch from Firestore
    const querySnapshot = await firestoreQuery.get();
    const data = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Cache the result in Redis for 5 minutes
    await redisClient.setEx(cacheKey, 300, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
