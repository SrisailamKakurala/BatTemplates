import React from "react";
import { FiEdit } from "react-icons/fi";

const EditProfileButton: React.FC = () => {
  return (
    <div className="absolute top-6 right-6">
      <button className="flex items-center space-x-2 text-primary hover:text-primaryHover font-semibold bg-gray-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all">
        <FiEdit className="text-xl" />
        <span>Edit Profile</span>
      </button>
    </div>
  );
};

export default EditProfileButton;
