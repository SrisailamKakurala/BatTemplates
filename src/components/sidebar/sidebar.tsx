import React from "react";
import NavItem from "@/components/navitem/NavItem";
import Logo from "../logo/Logo";
import { FiLogOut } from "react-icons/fi";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

// zustand auth store
import useAuthStore from "@/store/authStore";

// nav logos
import home from "@/assets/images/home.png";
import contributors from "@/assets/images/contributors.png";
import folders from "@/assets/images/folders.png";
import templates from "@/assets/images/templates.png";
import profile from "@/assets/images/profile.png";
import bookmarks from "@/assets/images/bookmarks.png";

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth); // Sign out from Firebase
      document.cookie = "accessToken=; max-age=0; path=/; samesite=strict"; // Remove cookie
      useAuthStore.getState().signOut(); // Clear zustand auth state
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Sign-Out failed.", error);
    }
  };


  return (
    <div className="flex flex-col w-[20%] h-screen bg-primaryBg border-white border-opacity-5 border-r-[0.5px] p-4">
      {/* Logo */}
      <Logo classNames="h-15 w-auto mx-auto" />

      {/* Navigation */}
      <div className="mt-12 space-y-2 flex-1">
        <NavItem icon={home} label="Home" to="/" classNames="" />
        <NavItem icon={folders} label="Folders" to="/folders" classNames="opacity-90 " />
        <NavItem icon={templates} label="Templates" to="/templates" classNames="opacity-90 " />
        <NavItem icon={bookmarks} label="Bookmarks" to="/bookmarks" classNames="opacity-90 " />
        <NavItem icon={profile} label="Profile" to="/profile" classNames="" />
        <NavItem icon={contributors} label="Contributors" to="/contributors" classNames="" />
      </div>

      {/* Logout - Conditional Rendering */}
      {isAuthenticated && (
        <div className="flex items-center justify-start px-3 h-12 text-primary border-t-2 border-white border-opacity-5 font-semibold filter brightness-110 ">
          <FiLogOut className="mr-4 ml-1 text-4xl" />
          <button
            onClick={handleLogout}
            className="w-full text-left text-2xl font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 
