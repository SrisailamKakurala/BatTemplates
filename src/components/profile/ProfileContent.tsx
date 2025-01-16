import React from "react";
import TabContent from "./TabContent";

interface ProfileContentProps {
  activeTab: "contributions" | "bookmarks";
  contributionsFolders: { type: string; id: string }[];
  contributionsTemplates: { type: string; id: string }[];
  bookmarksFolders: { type: string; id: string }[];
  bookmarksTemplates: { type: string; id: string }[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  activeTab,
  contributionsFolders,
  contributionsTemplates,
  bookmarksFolders,
  bookmarksTemplates,
}) => {
  return activeTab === "contributions" ? (
    <>
      <TabContent title="Folders" items={contributionsFolders} />
      <TabContent title="Templates" items={contributionsTemplates} />
    </>
  ) : (
    <>
      <TabContent title="Folders" items={bookmarksFolders} />
      <TabContent title="Templates" items={bookmarksTemplates} />
    </>
  );
};

export default ProfileContent;
