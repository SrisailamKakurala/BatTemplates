import React from "react";

interface Props {
  totalDownloads: number;
}

const TotalDownloads: React.FC<Props> = ({ totalDownloads }) => {
  return (
    <div className="border-4 border-primary p-6 rounded-lg shadow-md  text-center">
      <h2 className="text-xl font-bold text-primary mb-2">Downloads Today</h2>
      <p className="text-[25vh] font-bold text-green-600">{totalDownloads}</p>
    </div>
  );
};

export default TotalDownloads;
