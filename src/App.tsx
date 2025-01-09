import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Home from "@/pages/home/Home";
import Folders from "@/pages/folderStructures/Folders";
import Templates from "@/pages/templates/Templates";
import Bookmarks from "@/pages/bookmarks/Bookmarks";
import Profile from "@/pages/profile/Profile";
import Contributors from "@/pages/contributors/Contributors";
import SignIn from "./pages/auth/signin";
import Register from "./pages/auth/register";
import useModalStore from "@/store/modalStore"; // Import the modal store

const App: React.FC = () => {
  const { activeModal } = useModalStore(); // Access modal state

  return (
    <Router>
      <div className="flex h-screen bg-primaryBg font-[roboto] relative">
        <Sidebar />

        {/* Conditionally render modals */}
        {activeModal === "signin" && (
          <SignIn />
        )}
        {activeModal === "register" && (
          <Register />
        )}

        <div className="flex-1 p-4">
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
    </Router>
  );
};

export default App;
