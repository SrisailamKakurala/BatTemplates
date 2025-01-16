import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing an icon from react-icons

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    location?: string;
    photoURL?: string;
    joinedAt?: { seconds?: number };
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary bg-gray-600 flex justify-center items-center">
        {/* If user doesn't have photoURL, show the default icon */}
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUserCircle size={128} color="#6b7280" /> // Default user icon
        )}
      </div>
      <div className="mt-4 sm:mt-0 space-y-2">
        <h2 className="text-4xl font-bold text-primary">{user.name || "Unknown User"}</h2>
        <p className="text-lg text-gray-400">{user.email || "Email unavailable"}</p>
        <p className="text-lg text-gray-400">{user.location || "Location not provided"}</p>
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-primary">Joined on:</span>{" "}
          {user.joinedAt?.seconds
            ? new Date(user.joinedAt.seconds * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date not available"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
