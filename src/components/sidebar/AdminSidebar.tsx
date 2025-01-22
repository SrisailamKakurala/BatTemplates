import React from "react";
import NavItem from "@/components/navitem/NavItem";
import Logo, { LogoMobile } from "../logo/Logo";
import {
  FiHome,
  FiUsers,
  FiRefreshCw,
  FiFlag,
  FiBarChart2,
  FiAward,
  FiSettings,
  FiClipboard,
  FiLogOut,
} from "react-icons/fi";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

// Zustand auth store
import useAuthStore from "@/store/authStore";

const AdminSidebar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth);
      document.cookie = "accessToken=; max-age=0; path=/; samesite=strict";
      useAuthStore.getState().signOut();
      localStorage.removeItem("auth-storage");
      localStorage.removeItem("user");
      window.location.reload();
      console.log("Admin signed out successfully.");
    } catch (error) {
      console.error("Sign-Out failed.", error);
    }
  };

  return (
    <div className="flex flex-col w-[20%] h-screen bg-primaryBg text-primary border-r border-gray-700 shadow-lg px-4">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        {/* Show LogoMobile on small screens and Logo on larger screens */}
        <div className="block lg:hidden">
          <LogoMobile classNames="h-12 w-auto mx-auto" to="/" />
        </div>
        <div className="hidden lg:block">
          <Logo classNames="h-12 w-auto mx-auto" to="/" />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex-1 space-y-0.5">
        <NavItem icon={<FiHome className="text-2xl" />} label="Dashboard" to="/admin/dashboard" />
        <NavItem icon={<FiUsers className="text-2xl" />} label="Users" to="/admin/users" />
        <NavItem icon={<FiRefreshCw className="text-2xl" />} label="Templates" to="/admin/templates" />
        <NavItem icon={<FiFlag className="text-2xl" />} label="Flagged" to="/admin/flagged" />
        <NavItem icon={<FiBarChart2 className="text-2xl" />} label="Analytics" to="/admin/analytics" />
        <NavItem icon={<FiAward className="text-2xl" />} label="Contributors" to="/admin/contributors" />
        <NavItem icon={<FiSettings className="text-2xl" />} label="Settings" to="/admin/settings" />
        <NavItem icon={<FiClipboard className="text-2xl" />} label="Logs" to="/admin/logs" />
      </div>

      {/* Logout - Conditional Rendering */}
      {isAuthenticated && (
        <div className="mt-auto mb-2 border-t border-gray-700 py-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-start px-4 py-2 text-lg font-semibold hover:bg-primary rounded-xl hover:text-white transition-all duration-200"
          >
            <FiLogOut className="mr-3 text-2xl font-extrabold" />
            <span className="hidden lg:inline md:inline">Logout</span> {/* Hide label on small screens */}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
