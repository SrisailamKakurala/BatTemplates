import React from "react";
import FlaggedContentItem from "@/components/flagComponents/FlaggedContentItem"; // Import FlaggedContentItem

interface FlaggedContentListProps {
  items: any[];
  onResolve: (id: string) => void;
}

const FlaggedContentList: React.FC<FlaggedContentListProps> = ({ items, onResolve }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <FlaggedContentItem key={item.id} item={item} onResolve={onResolve} />
      ))}
    </div>
  );
};

export default FlaggedContentList;
