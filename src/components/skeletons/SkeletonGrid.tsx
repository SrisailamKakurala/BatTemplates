import React from "react";

interface SkeletonGridProps {
  count?: number;
  height?: string;
  width?: string;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  count = 6, // Default: 6 skeletons
  height = "h-40", // Default: 40px height
  width = "w-full", // Default: Full width
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${height} ${width}`}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
