import React from "react";

interface SkeletonListProps {
  count?: number;
  height?: string;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ count = 3, height = "h-16" }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`animate-pulse bg-secondary p-6 rounded-lg shadow-lg`}>
          <div className={`${height} w-2/3 bg-gray-500 mb-2 rounded`}></div>
          <div className="h-3 w-1/2 bg-gray-600 mb-2 rounded"></div>
          <div className="h-3 w-1/3 bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;
