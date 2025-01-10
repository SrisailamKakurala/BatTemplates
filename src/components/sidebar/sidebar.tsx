import React from "react";
import NavItem from "@/components/navitem/NavItem";
import Logo from "../logo/Logo";
import { FiLogOut } from "react-icons/fi";

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
  const { isAuthenticated, signOut } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Sign-Out failed.");
    }
  };


  return (
    <div className="flex flex-col w-[20%] h-screen bg-primaryBg border-white border-opacity-5 border-r-[0.5px] p-4">
      {/* Logo */}
      <Logo classNames="h-10 w-auto" />

      {/* Navigation */}
      <div className="mt-6 space-y-2 flex-1">
        <NavItem icon={home} label="Home" to="/" classNames="" />
        <NavItem icon={folders} label="Folders" to="/folders" classNames="opacity-90 " />
        <NavItem icon={templates} label="Templates" to="/templates" classNames="opacity-90 " />
        <NavItem icon={bookmarks} label="Bookmarks" to="/bookmarks" classNames="opacity-90 " />
        <NavItem icon={profile} label="Profile" to="/profile" classNames="" />
        <NavItem icon={contributors} label="Contributors" to="/contributors" classNames="" />
      </div>

      {/* Logout - Conditional Rendering */}
      {isAuthenticated && (
        <div className="flex items-center justify-start px-3 h-12 text-primary border-t-2 border-white border-opacity-5 font-semibold">
          <FiLogOut className="mr-2 text-xl" />
          <button
            onClick={handleLogout}
            className="w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
