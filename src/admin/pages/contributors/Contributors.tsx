// components/Contributors.tsx
import React, { useEffect, useState } from "react";
import { fetchContributors } from "@/firebase/services/contributorServices/contributorService";
import ContributorCard from "@/components/cards/ContributorCard";
import Search from "@/components/search/Search";
import { FaUsers } from "react-icons/fa"; // Import an icon for the title

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [filteredContributors, setFilteredContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedContributors = await fetchContributors();
        setContributors(fetchedContributors);
        setFilteredContributors(fetchedContributors); // Set filtered contributors as the initial list
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

  if (loading) {
    return <div>Loading contributors...</div>;
  }

  return (
    <div className="h-full w-full px-4 lg:px-8 py-6 overflow-y-scroll bg-primaryBg scroll-hide">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-primary text-2xl md:text-3xl font-bold">
          <FaUsers size={36} />
          <h1>Contributors</h1>
        </div>

        <div className="">
          <Search
            placeholder="Search contributors..."
            page="contributors"
            data={contributors}
            onFilter={handleFilter}
            className="w-48 bg-white bg-opacity-10 p-2 rounded-lg text-white focus:ring-primary focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid Layout for Contributor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredContributors.map((user) => (
          <ContributorCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Contributors;
