import React from "react";
import TabContent from "./TabContent";

interface ProfileContentProps {
  contributionsFolders: { type: string; id: string }[];
  contributionsTemplates: { type: string; id: string }[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  contributionsFolders,
  contributionsTemplates,
}) => {
  return (
    <>
      <h4 className="text-xl text-primary font-bold underline underline-offset-4 mb-2">Contributions</h4>
      <TabContent title="Templates" items={contributionsTemplates} />
      <TabContent title="Folders" items={contributionsFolders} />
    </>
  );
};

export default ProfileContent;
