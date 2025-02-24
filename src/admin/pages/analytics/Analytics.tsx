import { useEffect, useState } from "react";
import { getAnalyticsData } from "@/firebase/services/analytics/analytics.service";
import { FaChartBar } from "react-icons/fa";
import { AnalyticsCollection } from "@/constants/schema"
import OverviewCard from "@/components/analytics/OverviewCard";
import LineChartComponent from "@/components/analytics/DailyOverViewChart";
import StructureAnalytics from "@/components/analytics/StructureAnalytics";
import CircularLoader from "@/components/loaders/CircularLoader";
import TemplateAnalytics from "@/components/analytics/TemplateAnalytics";
import UserAnalytics from "@/components/analytics/UserAnalytics";


const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsCollection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalyticsData();
        setAnalytics(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex md:justify-start justify-center items-center gap-3 font-extrabold md:text-3xl text-2xl text-primary mb-6">
        <FaChartBar />
        <span>Analytics</span>
      </div>

      {analytics?.global && <OverviewCard {...analytics.global} />}
      <LineChartComponent dailyActivity={analytics?.global?.dailyActivity ?? {}} />
      
      <UserAnalytics
        totalUsers={analytics?.users?.totalUsers ?? 0} // Provide a default value
        newUsersPerDay={analytics?.users?.newUsersPerDay ?? {}} 
        topContributors={analytics?.users?.topContributors ?? []} 
        rolesDistribution={analytics?.users?.rolesDistribution ?? {}}
      />


      <StructureAnalytics
        totalStructures={analytics?.structures?.totalStructures ?? 0}
        mostDownloaded={analytics?.structures?.mostDownloaded ?? { id: "N/A", count: 0 }}
        totalDownloads={analytics?.structures?.totalDownloads ?? 0}
        osDistribution={analytics?.structures?.osDistribution ?? {}}
      />


      <TemplateAnalytics
        totalTemplates={analytics?.templates?.totalTemplates ?? 0}
        approvedTemplates={analytics?.templates?.approvedTemplates ?? 0}
        pendingTemplates={analytics?.templates?.pendingTemplates ?? 0}
        mostPopular={analytics?.templates?.mostPopular ?? { id: "", count: 0 }} // Ensure correct structure
        mostLikedTemplates={analytics?.templates?.mostLikedTemplates ?? []} 
      />

    </div>
  );
};

export default Analytics;