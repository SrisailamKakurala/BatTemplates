import React from "react";
import { FaExclamationTriangle, FaCheck, FaTrash } from "react-icons/fa";
import ActionButton from "@/components/flagComponents/ActionButton"; // Import ActionButton component

interface FlaggedContentItemProps {
  item: any;
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
}

const FlaggedContentItem: React.FC<FlaggedContentItemProps> = ({ item, onResolve, onDelete }) => {
  return (
    <div
      key={item.id}
      className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-700"
    >
      <div className="flex-1">
        <h2 className="md:text-xl text-md font-semibold flex items-center text-white">
          <FaExclamationTriangle className="text-yellow-500 mr-2" /> {item.id}
        </h2>
        <p className="text-sm text-gray-300 mt-1">📝 Reason: {item.reason}</p>
        <p className="text-sm text-gray-400 mt-1">
          ⏳ Flagged At: {new Date(item.flaggedAt.seconds * 1000).toLocaleString()}
        </p>
        {item.title && <p className="text-sm text-gray-300 mt-1">📌 Title: {item.title}</p>}
        {item.githubLink && (
          <p className="text-sm text-gray-300 mt-1">
            🔗 GitHub:{" "}
            <a
              href={item.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {item.githubLink}
            </a>
          </p>
        )}
        {item.flaggedBy && <p className="text-sm text-gray-300 mt-1">👤 Flagged By: {item.flaggedBy}</p>}
        <p className="text-sm text-gray-300 mt-1">🔎 Type: {item.type}</p>
      </div>
      <div className="flex space-x-3 mt-4 sm:mt-0">
        <ActionButton
          label="Resolve"
          icon={<FaCheck />}
          onClick={() => onResolve(item.id)}
          className="bg-green-500 text-white"
        />
        <ActionButton
          label="Delete"
          icon={<FaTrash />}
          onClick={() => onDelete(item.id)}
          className="bg-red-500 text-white"
        />
      </div>
    </div>
  );
};

export default FlaggedContentItem;
