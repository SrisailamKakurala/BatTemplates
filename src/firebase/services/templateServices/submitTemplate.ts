import { db } from "@/firebase/firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface Template {
  title: string;
  description: string;
}

export const submitTemplate = async (template: Template) => {
  const templatesRef = collection(db, "templates");
  await addDoc(templatesRef, {
    ...template,
    createdAt: Timestamp.now(),
  });
};
