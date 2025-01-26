import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { Template } from "@/constants/schema";

export const fetchApprovedTemplates = async (): Promise<Template[]> => {
  const templatesRef = collection(db, "templates");
  const q = query(templatesRef, where("isApproved", "==", true));

  const querySnapshot = await getDocs(q);
  const templates: Template[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Template[];

  return templates;
};
