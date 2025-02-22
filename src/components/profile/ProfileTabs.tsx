import React from "react";

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex border-b-[0.1px] border-gray-700 justify-center sm:justify-start">
      <h2 className="py-3 px-6 text-lg sm:text-xl font-semibold text-primary border-b-4 border-primary">
        Contributions
      </h2>
    </div>
  );
};

export default ProfileHeader;
