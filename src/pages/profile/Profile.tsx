import React, { useEffect, useState, useMemo } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfileButton from "@/components/profile/EditProfileButton";
import ProfileContent from "@/components/profile/ProfileContent";
import useUtilsStore from "@/store/utilsStore";
import { getUserFromFirestore } from "@/firebase/services/userServices/user.service";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const { reloadProfile, setReloadProfile } = useUtilsStore();

  // Function to retrieve the user from auth-storage
  const getUser = () => {
    const authStorage = localStorage.getItem("auth-storage");
    return authStorage ? JSON.parse(authStorage)?.state?.user : null;
  };

  // Fetch user data from Firestore
  const fetchUser = async () => {
    try {
      const user = getUser();
      const userId = user?.id; // Extract user ID

      if (!userId) {
        console.error("User ID not found in auth-storage.");
        return;
      }

      const userData = await getUserFromFirestore(userId); // Fetch user data from Firestore
      setUser(userData); // Update state with fetched user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Handle reloadProfile to refresh user data
  useEffect(() => {
    if (reloadProfile) {
      fetchUser(); // Re-fetch user data when reloadProfile is true
      setReloadProfile(false); // Reset the reloadProfile state
    }
  }, [reloadProfile, setReloadProfile]);

  // Filter contributions into folders and templates
  const contributionsFolders = useMemo(
    () => user?.contributions?.filter((item: any) => item.type === "structure") || [],
    [user?.contributions]
  );
  const contributionsTemplates = useMemo(
    () => user?.contributions?.filter((item: any) => item.type === "template") || [],
    [user?.contributions]
  );

  // console.log(contributionsFolders)
  // console.log(contributionsTemplates)

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
      <ProfileContent
        contributionsFolders={contributionsFolders}
        contributionsTemplates={contributionsTemplates}
      />
    </div>
  );
};

export default Profile;
