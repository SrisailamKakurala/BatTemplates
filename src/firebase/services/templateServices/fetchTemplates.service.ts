import { collection, getDocs, query, where, doc, getDoc, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { Template } from "@/constants/schema";

export const fetchApprovedTemplates = async (): Promise<Template[]> => {
  const templatesRef = collection(db, "templates");
  
  // Query to get templates where 'isApproved' is true and ordered by 'likes' field in descending order
  const q = query(templatesRef, where("isApproved", "==", true), orderBy("likes", "desc"));

  const querySnapshot = await getDocs(q);
  const templates: Template[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Template[];

  return templates;
};


/**
 * Fetch a single template by its ID.
 * @param templateId - The ID of the template.
 * @returns The template data.
 */
export const fetchTemplateById = async (templateId: string): Promise<Template | null> => {
  const templateRef = doc(db, "templates", templateId);
  const templateSnapshot = await getDoc(templateRef);

  if (templateSnapshot.exists()) {
    return { id: templateSnapshot.id, ...templateSnapshot.data() } as Template;
  } else {
    console.error(`Template with ID ${templateId} not found`);
    return null;
  }
};

/**
 * Fetch multiple templates by an array of IDs.
 * @param templateIds - Array of template IDs.
 * @returns An array of templates.
 */
export const fetchTemplatesByIds = async (templateIds: string[]): Promise<Template[]> => {
  const templates: Template[] = [];

  for (const templateId of templateIds) {
    const template = await fetchTemplateById(templateId);
    if (template) templates.push(template);
  }

  return templates;
};
