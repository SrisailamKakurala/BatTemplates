import React from "react";
import FlaggedContentItem from "@/components/flagComponents/FlaggedContentItem"; // Import FlaggedContentItem

interface FlaggedContentListProps {
  items: any[];
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
}

const FlaggedContentList: React.FC<FlaggedContentListProps> = ({ items, onResolve, onDelete }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <FlaggedContentItem key={item.id} item={item} onResolve={onResolve} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default FlaggedContentList;
