import React, { useEffect, useState } from "react";
import NavItem from "@/components/navitem/NavItem";
import Logo, { LogoMobile } from "../logo/Logo";
import {
  FiHome,
  FiUsers,
  FiFlag,
  FiBarChart2,
  FiAward,
  FiSettings,
  FiClipboard,
  FiLogOut,
} from "react-icons/fi";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { getUser } from "@/utils/localStorageUtil"; // Import the getUser utility

const AdminSidebar: React.FC = () => {
  const [userRoles, setUserRoles] = useState<string[]>([]);  // State to store user roles
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch user roles and authentication state
  useEffect(() => {
    const user = getUser();  // Get user data from localStorage
    if (user) {
      setIsAuthenticated(true);
      setUserRoles(user.roles || []);  // Assuming roles are stored in the user object
    } else {
      setIsAuthenticated(false);
      setUserRoles([]);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth);
      document.cookie = "accessToken=; max-age=0; path=/; samesite=strict";
      setIsAuthenticated(false);
      setUserRoles([]);
      localStorage.removeItem("auth-storage");
      localStorage.removeItem("user");
      window.location.reload();
      console.log("Admin signed out successfully.");
    } catch (error) {
      console.error("Sign-Out failed.", error);
    }
  };

  return (
    <div className="flex flex-col md:w-[20%] w-[12%] h-screen bg-primaryBg text-primary border-r border-gray-700 shadow-lg md:px-4 px-1">
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
        {/* Conditionally render Users and Settings links */}
        {userRoles.includes("admin") && (
          <>
            <NavItem icon={<FiUsers className="text-2xl" />} label="Users" to="/admin/users" />
          </>
        )}
        <NavItem icon={<FiFlag className="text-2xl" />} label="Flagged" to="/admin/flagged" />
        <NavItem icon={<FiBarChart2 className="text-2xl" />} label="Analytics" to="/admin/analytics" />
        <NavItem icon={<FiClipboard className="text-2xl" />} label="Logs" to="/admin/logs" />
        <NavItem icon={<FiAward className="text-2xl" />} label="Contributors" to="/admin/contributors" />
        {userRoles.includes("admin") && (
          <>
            <NavItem icon={<FiSettings className="text-2xl" />} label="Settings" to="/admin/settings" />
          </>
        )}
      </div>

      {/* Logout - Conditional Rendering */}
      {isAuthenticated && (
        <div className="mt-auto mb-2 border-t border-gray-700 py-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center md:justify-start justify-center md:px-4 md:py-3 text-lg font-semibold hover:bg-primary rounded-xl hover:text-white transition-all duration-200"
          >
            <FiLogOut className="md:mr-3 text-2xl font-extrabold" />
            <span className="hidden lg:inline">Logout</span> {/* Hide label on small screens */}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
