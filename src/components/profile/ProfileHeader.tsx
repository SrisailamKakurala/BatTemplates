import React from "react";
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    location?: string;
    photoURL?: string;
    joinedAt?: { seconds?: number };
    personalLinks?: Record<string, { platform: "GitHub" | "LinkedIn" | "X" | "Instagram"; url: string }>;
  };
}

const platformIcons: Record<"GitHub" | "LinkedIn" | "X" | "Instagram", JSX.Element> = {
  GitHub: <FaGithub size={20} className="text-primary hover:text-primaryHover" />,
  LinkedIn: <FaLinkedin size={20} className="text-primary hover:text-primaryHover" />,
  X: <FaTwitter size={20} className="text-primary hover:text-primaryHover" />,
  Instagram: <FaInstagram size={20} className="text-primary hover:text-primaryHover" />,
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  // Convert personalLinks object to an array
  const personalLinksArray = user.personalLinks
    ? Object.values(user.personalLinks)
    : [];

  return (
    <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary bg-gray-600 flex justify-center items-center">
        {user?.photoURL ? (
          <img src={user?.photoURL} alt="Profile Avatar" className="w-full h-full object-cover" />
        ) : (
          <FaUserCircle size={128} color="#6b7280" />
        )}
      </div>
      <div className="mt-4 sm:mt-0 space-y-4 text-center sm:text-left">
        <h2 className="text-3xl font-bold text-primary">{user?.name || "Unknown User"}</h2>
        <div className="flex justify-center sm:justify-start items-center space-x-2">
          <FaEnvelope size={16} className="text-gray-400" />
          <p className="text-lg text-gray-400">{user.email || "Email unavailable"}</p>
        </div>
        <div className="flex justify-center sm:justify-start items-center space-x-2">
          <FaMapMarkerAlt size={16} className="text-gray-400" />
          <p className="text-lg text-gray-400">{user?.location || "Location not provided"}</p>
        </div>
        <div className="flex justify-center sm:justify-start items-center space-x-2">
          <FaCalendarAlt size={16} className="text-gray-400" />
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-primary">Joined on:</span>{" "}
            {user.joinedAt?.seconds
              ? new Date(user?.joinedAt.seconds * 1000).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date not available"}
          </p>
        </div>
        {personalLinksArray.length > 0 && (
          <div className="flex flex-wrap justify-center sm:justify-start items-center space-x-4 mt-4">
            {personalLinksArray.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-400 hover:text-primary transition"
              >
                {platformIcons[link.platform]}
                <span className="hidden sm:inline text-sm">{link.platform}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
