import { db } from "@/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { StructuresAnalytics, MostPopular, OSDistribution, Folder } from "@/constants/schema";

export const getStructuresAnalytics = async (): Promise<StructuresAnalytics> => {
    try {
        const snapshot = await getDocs(collection(db, "structures"));
        const structures: Folder[] = snapshot.docs.map((doc) => doc.data() as Folder);

        const totalStructures = structures.length;

        // Calculate total downloads
        const totalDownloads = structures.reduce((sum, structure) => sum + structure.downloads, 0);

        // Find most downloaded structure
        const mostDownloaded = structures.reduce((max, structure) => {
            return structure.downloads > max.count ? { id: structure.id, count: structure.downloads } : max;
        }, { id: "", count: 0 } as MostPopular);

        // OS usage distribution
        const osDistribution: OSDistribution = {};
        structures.forEach((structure) => {
            osDistribution[structure.os] = (osDistribution[structure.os] || 0) + 1;
        });

        console.log("totalDownloads: " + totalDownloads);

        return {
            totalStructures,
            mostDownloaded,
            totalDownloads,
            osDistribution,
        };
    } catch (error) {
        console.error("Failed to fetch structures analytics:", error);
        return {
            totalStructures: 0,
            mostDownloaded: { id: "", count: 0 },
            totalDownloads: 0,
            osDistribution: {},
        };
    }
};

export default getStructuresAnalytics;
