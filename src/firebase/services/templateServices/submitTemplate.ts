import { db } from "@/firebase/firebase.config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Template } from "@/constants/schema";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";

export const submitTemplate = async (
  templateData: Template,
  addToast: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void
) => {
  try {
    const templatesRef = collection(db, "templates");

    // Add the document and get the document reference
    const docRef = await addDoc(templatesRef, templateData);
    console.log(templateData)
    // Set the doc ID in the template data
    const templateWithId = { ...templateData, id: docRef.id };
    
    // Update the document with the generated ID
    await setDoc(doc(db, "templates", docRef.id), templateWithId);

    await addLogToFirestore({
      action: "📙 Template Submitted",
      userId: templateData.authorId,
      userEmail: templateData.authorEmail,
      details: `
        User: ${templateData.author}
        template: ${templateData.title}
        templateId: ${docRef.id}
        Time: ${new Date().toLocaleTimeString()}
      `
    });
    

    addToast("Template submitted successfully!", "success");

    return templateWithId;
  } catch (error) {
    console.error("Error submitting template:", error);
    
    addToast("Failed to submit the template. Try again.", "error");

    // 🔹 Log the error in Firestore
    await addLogToFirestore({
      action: "Template Submission Failed",
      userId: templateData.authorId,
      userEmail: templateData.authorEmail,
      details: `User ${templateData.author} failed to submit a template: ${templateData.title}. Error: ${error}`,
    });

    throw error; // Re-throw the error for handling in the component
  }
};
