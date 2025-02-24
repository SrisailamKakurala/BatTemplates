import { useEffect, useState } from "react";
import ContributorCard from "@/components/cards/ContributorCard";
import { fetchContributors } from "@/firebase/services/contributorServices/contributor.service";

const TopContributors = ({ topContributors }: { topContributors: { id: string; contributions: number }[] }) => {
  const [contributors, setContributors] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchContributors();
      const updatedContributors = users
        .map((user) => ({
          ...user,
          contributions: topContributors.find((c) => c.id === user.id)?.contributions || 0,
        }))
        .sort((a, b) => b.contributions - a.contributions).splice(0, 3); // Sort by contributions

      setContributors(updatedContributors);
    };

    fetchUsers();
  }, [topContributors]);

  return (
    <div className="p-4 border-4 border-primary rounded-lg shadow-lg h-full">
      <h2 className="text-lg text-primary font-semibold mb-8">Top Contributors</h2>
      <div className="flex flex-col gap-4 justify-around p-4">
        {contributors.length > 0 ? (
          contributors.map((user) => <ContributorCard key={user.id} user={user} />)
        ) : (
          <p className="text-white">No contributors found.</p>
        )}
      </div>
    </div>
  );
};

export default TopContributors;
