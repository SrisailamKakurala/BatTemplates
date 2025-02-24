import React from "react";
import NewUsersChart from "@/components/analytics/NewUsersChart";
import RolesPieChart from "@/components/analytics/RolesPieChart";
import TopContributors from "@/components/analytics/TopContributors";
import { UsersAnalytics } from "@/constants/schema";

const UserAnalytics: React.FC<UsersAnalytics> = ({ newUsersPerDay, rolesDistribution, topContributors }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Section: RolesPieChart & TopContributors */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="lg:w-1/2 w-full">
          <RolesPieChart rolesDistribution={rolesDistribution} />
        </div>
        <div className="lg:w-1/2 w-full">
          <TopContributors topContributors={topContributors} />
        </div>
      </div>

      {/* Bottom Section: New Users Chart (Takes Full Width) */}
      <div className="w-full">
        <NewUsersChart newUsersPerDay={newUsersPerDay} />
      </div>
    </div>
  );
};

export default UserAnalytics;
