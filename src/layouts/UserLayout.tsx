import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "@/pages/home/Home";
import Folders from "@/pages/folderStructures/Folders";
import Templates from "@/pages/templates/Templates";
import Bookmarks from "@/pages/bookmarks/Bookmarks";
import Profile from "@/pages/profile/Profile";
import Contributors from "@/pages/contributors/Contributors";
import Sidebar from "@/components/sidebar/Sidebar";
import Loader from "@/components/loaders/Loader";
import SignIn from "@/pages/auth/signin";
import Register from "@/pages/auth/register";
import NotFound from "@/pages/404";

// store
import useModalStore from "@/store/modalStore";
import useUtilsStore from "@/store/utilsStore";

// middleware
import authMiddleware from "@/middlewares/authMiddleware";

// Constants
import { VALID_ROUTES } from "@/constants/validRoutes";

const UserLayout: React.FC = () => {
  const loading = useUtilsStore((state) => state.loading);
  const { activeModal } = useModalStore();
  const location = useLocation();

  useEffect(() => {
    authMiddleware();
  }, []);

  // If loading, show loader
  if (loading) {
    return <Loader />;
  }

  // Check if the current path is valid
  const isNotFound = !VALID_ROUTES.includes(location.pathname);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="flex h-screen bg-primaryBg font-[roboto] relative">
      {/* Sidebar should only render for valid paths */}
      <Sidebar />

      {/* Conditionally render modals */}
      {activeModal === "signin" && <SignIn />}
      {activeModal === "register" && <Register />}

      <div className="flex-1 md:p-4 md:w-full w-[88%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contributors" element={<Contributors />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserLayout;
