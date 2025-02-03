import React, { useEffect, useState } from "react";
import { getFlaggedContent, updateFlagStatus, deleteFlaggedContent } from "@/firebase/services/adminServices/flag.service";
import { useToast } from "@/hooks/ui/useToast";
import FlaggedContentList from "@/components/flagComponents/FlaggedContentList";
import SkeletonList from "@/components/skeletons/SkeletonList"; // Import the new skeleton component
import { FaFlag } from "react-icons/fa";

const FlaggedContent: React.FC = () => {
  const [flaggedItems, setFlaggedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchFlaggedContent = async () => {
      setLoading(true);
      try {
        const data = await getFlaggedContent();
        if (isMounted) {
          setFlaggedItems(data);
        }
      } catch (error) {
        console.error("Error fetching flagged content:", error);
        addToast("Failed to load flagged content.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchFlaggedContent();

    return () => {
      isMounted = false;
    };
  }, [addToast]);

  const handleResolve = async (id: string) => {
    const success = await updateFlagStatus(id, "resolved");
    if (success) {
      addToast("Flagged content resolved.", "success");
      setFlaggedItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      addToast("Failed to resolve content.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this flagged content?")) return;
    const success = await deleteFlaggedContent(id);
    if (success) {
      addToast("Flagged content deleted.", "success");
      setFlaggedItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      addToast("Failed to delete content.", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex md:justify-start justify-center gap-2 font-extrabold md:text-3xl text-2xl text-primary mb-6">
        <FaFlag />
        <span>Flagged Content</span>
      </div>

      {loading ? (
        <SkeletonList count={3} height="h-16" />
      ) : flaggedItems.length === 0 ? (
        <p className="text-gray-400 text-xl mt-4">No flagged content.</p>
      ) : (
        <FlaggedContentList items={flaggedItems} onResolve={handleResolve} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default FlaggedContent;
