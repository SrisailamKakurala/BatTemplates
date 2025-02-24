import OsDistributionPieChart from "@/components/analytics/OsDistributionPieChart";
import MostDownloadedStructure from "@/components/analytics/MostDownloadedStructure";
import TotalStructuresCard from "@/components/analytics/TotalStructuresCard";
import TotalDownloads from "@/components/analytics/TotalDownloads";
import { StructuresAnalytics } from "@/constants/schema";

const StructureAnalytics = ({ totalStructures, mostDownloaded, osDistribution, totalDownloads }: StructuresAnalytics) => {
  return (
    <div className="flex flex-col mt-5">
      <h2 className="text-primaryHover mt-5 text-xl font-bold mb-4">Structure Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <TotalStructuresCard totalStructures={totalStructures} />
        <MostDownloadedStructure mostDownloaded={mostDownloaded} />
        <OsDistributionPieChart osDistribution={osDistribution} />
        <TotalDownloads totalDownloads={totalDownloads} />
    </div>
    </div>
  );
};

export default StructureAnalytics;
