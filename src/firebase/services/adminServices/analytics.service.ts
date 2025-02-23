import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { AnalyticsCollection } from "@/constants/schema";

const getAnalytics = async (): Promise<AnalyticsCollection | null> => {
  const docRef = doc(db, "analytics", "global");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as AnalyticsCollection;
  } else {
    console.log("No analytics data found.");
    return null;
  }
};

getAnalytics()
