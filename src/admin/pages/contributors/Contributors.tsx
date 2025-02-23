import React, { useEffect, useState } from "react";
import { fetchContributors } from "@/firebase/services/contributorServices/contributor.service";
import ContributorCard from "@/components/cards/ContributorCard";
import Search from "@/components/search/Search";
import SkeletonGrid from "@/components/skeletons/SkeletonGrid";
import { FaUsers } from "react-icons/fa";

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [filteredContributors, setFilteredContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedContributors = await fetchContributors();
        setContributors(fetchedContributors);
        setFilteredContributors(fetchedContributors);
        console.log(fetchedContributors)
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search filtering
  const handleFilter = (filteredData: any[]) => {
    setFilteredContributors(filteredData);
  };

  return (
    <div className="h-full w-full px-4 lg:px-8 py-6 overflow-y-scroll bg-primaryBg scroll-hide">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-primary text-2xl md:text-3xl font-bold">
          <FaUsers size={36} />
          <h1>Contributors</h1>
        </div>

        <div>
          <Search
            placeholder="Search contributors..."
            page="contributors"
            data={contributors}
            onFilter={handleFilter}
            className="w-48 bg-white bg-opacity-10 p-2 rounded-lg text-white focus:ring-primary focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid Layout */}
      {loading ? (
        <SkeletonGrid count={6} height="h-36" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredContributors
          .sort((a, b) => (b.contributions?.length || 0) - (a.contributions?.length || 0)) // Sort contributors by highest contributions first
          .map((user) => (
            <ContributorCard key={user.id || user.email} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contributors;
