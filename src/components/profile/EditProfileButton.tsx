import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditProfileForm from "@/components/profile/EditProfileForm";

const EditProfileButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="absolute top-6 right-6">
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center space-x-2 text-whiteText duration-200 hover:bg-primaryHover font-semibold bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <FiEdit className="text-xl" />
        <span className="hidden md:inline">Edit Profile</span>
      </button>

      {showForm && (
        <EditProfileForm
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default EditProfileButton;