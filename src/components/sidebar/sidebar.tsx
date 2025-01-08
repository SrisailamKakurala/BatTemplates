import React from "react";
import NavItem from "@/components/navitem/NavItem";
import Logo from "../logo/Logo";

// nav logos
import home from "@/assets/images/home.png"
import contributors from "@/assets/images/contributors.png"
import folders from "@/assets/images/folders.png"
import templates from "@/assets/images/templates.png"
import profile from "@/assets/images/profile.png"
import bookmarks from "@/assets/images/bookmarks.png"

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-[20%] h-screen bg-primaryBg border-slate-700 border-r-[0.5px] p-4">
      {/* Logo */}
      <Logo classNames="h-10 w-auto" />

      {/* Navigation */}
      <div className="mt-6 space-y-2">
        <NavItem icon={home} label="Home" to="/" classNames="" />
        <NavItem icon={folders} label="Folders" to="/folders" classNames="opacity-90 " />
        <NavItem icon={templates} label="Templates" to="/templates" classNames="opacity-90 " />
        <NavItem icon={bookmarks} label="Bookmarks" to="/bookmarks" classNames="opacity-90 " />
        <NavItem icon={profile} label="Profile" to="/profile" classNames="" />
        <NavItem icon={contributors} label="Contributors" to="/contributors" classNames="" />
      </div>
    </div>
  );
};

export default Sidebar;
