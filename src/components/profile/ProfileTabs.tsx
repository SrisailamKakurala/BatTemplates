import React from "react";

interface ProfileTabsProps {
  activeTab: "contributions" | "bookmarks";
  setActiveTab: (tab: "contributions" | "bookmarks") => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b-[0.1px] border-gray-700">
      <button
        className={`py-3 px-6 text-xl font-semibold ${
          activeTab === "contributions"
            ? "text-primary border-b-4 border-primary"
            : "text-gray-400 hover:text-primary"
        } transition-all`}
        onClick={() => setActiveTab("contributions")}
      >
        Contributions
      </button>
      <button
        className={`py-3 px-6 text-xl font-semibold ${
          activeTab === "bookmarks"
            ? "text-primary border-b-4 border-primary"
            : "text-gray-400 hover:text-primary"
        } transition-all`}
        onClick={() => setActiveTab("bookmarks")}
      >
        Bookmarks
      </button>
    </div>
  );
};

export default ProfileTabs;
