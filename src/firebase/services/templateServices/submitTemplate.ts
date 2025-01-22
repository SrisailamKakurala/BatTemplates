import { db } from "@/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { Template } from "@/constants/schema";
import { useToast } from "@/hooks/ui/useToast";

export const submitTemplate = async (template: Template) => {
  const templatesRef = collection(db, "templates");
  
  const { addToast } = useToast();

  try {
    // Attempt to add the template to Firestore
    await addDoc(templatesRef, template);
    console.log("Template successfully submitted:", template);
    addToast("Template submitted successfully!", "success");
  } catch (error) {
    console.error("Error adding template:", error);
    addToast("Error submitting template!", "error");
    throw error;
  }
};
