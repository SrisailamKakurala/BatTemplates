import React, { useEffect, useState, useMemo } from "react";
import { getAuthStorage } from "@/utils/localStorageUtil";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfileButton from "@/components/profile/EditProfileButton";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileContent from "@/components/profile/ProfileContent";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"contributions" | "bookmarks">("contributions");

  useEffect(() => {
    const authData = getAuthStorage();
    if (authData?.state?.isAuthenticated) {
      setUser(authData.state.user);
    }
  }, []);

  const contributionsFolders = useMemo(() => user?.contributions?.filter((item: any) => item.type === "folder") || [], [user?.contributions]);
  const contributionsTemplates = useMemo(() => user?.contributions?.filter((item: any) => item.type === "template") || [], [user?.contributions]);
  const bookmarksFolders = useMemo(() => user?.bookmarks?.filter((item: any) => item.type === "folder") || [], [user?.bookmarks]);
  const bookmarksTemplates = useMemo(() => user?.bookmarks?.filter((item: any) => item.type === "template") || [], [user?.bookmarks]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white text-center space-y-4">
        <p className="text-2xl font-semibold">User not logged in</p>
        <p className="text-sm mt-2 text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full md:h-auto h-full max-w-5xl mx-auto bg-secondary p-6 rounded-lg shadow-lg space-y-8 text-white overflow-y-scroll scroll-hide">
      <EditProfileButton />
      <ProfileHeader user={user} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProfileContent
        activeTab={activeTab}
        contributionsFolders={contributionsFolders}
        contributionsTemplates={contributionsTemplates}
        bookmarksFolders={bookmarksFolders}
        bookmarksTemplates={bookmarksTemplates}
      />
    </div>
  );
};

export default Profile;
