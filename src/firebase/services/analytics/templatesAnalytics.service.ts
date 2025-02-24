import { db } from "@/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { TemplatesAnalytics, MostPopular, Template } from "@/constants/schema";

export const getTemplatesAnalytics = async (): Promise<TemplatesAnalytics> => {
    try {
        const snapshot = await getDocs(collection(db, "templates"));
        const templates: Template[] = snapshot.docs.map((doc) => doc.data() as Template);

        const totalTemplates = templates.length;
        const approvedTemplates = templates.filter((template) => template.isApproved).length;
        const pendingTemplates = totalTemplates - approvedTemplates;

        // Find most liked template
        const mostLikedTemplate = templates.reduce((max, template) => {
            return template.likes.length > max.count ? { id: template.id, count: template.likes.length } : max;
        }, { id: "", count: 0 } as MostPopular);

        // Get top 5 most liked templates
        const mostLikedTemplates = templates
            .map((template) => ({ id: template.id, count: template.likes.length }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 2);

        return {
            totalTemplates,
            approvedTemplates,
            pendingTemplates,
            mostPopular: mostLikedTemplate,
            mostLikedTemplates,
        };
    } catch (error) {
        console.error("Failed to fetch templates analytics:", error);
        return {
            totalTemplates: 0,
            approvedTemplates: 0,
            pendingTemplates: 0,
            mostPopular: { id: "", count: 0 },
            mostLikedTemplates: [],
        };
    }
};

export default getTemplatesAnalytics;
