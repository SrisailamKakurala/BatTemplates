import { Route, Routes, Outlet } from "react-router-dom";
import AdminDashBoard from "@/admin/pages/dashboard/AdminDashBoard";
import Users from "@/admin/pages/users/Users";
import FlaggedContent from "@/admin/pages/flaggedContent/FlaggedContent";
import Analytics from "@/admin/pages/analytics/Analytics";
import Settings from "@/admin/pages/settings/Settings";
import Logs from "@/admin/pages/logs/Logs";
import Contributors from "@/admin/pages/contributors/Contributors";
import AdminLogin from "@/admin/pages/login/AdminLogin";
import ProtectedRoute from "@/admin/ProtectedRoute";
import AdminSidebar from "@/components/sidebar/AdminSidebar";

const AdminLayout: React.FC = () => {
  return (
    <Routes>
      {/* Protected Route for authenticated admin pages */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin", "member"]}>
            <div className="flex bg-primaryBg h-screen w-[100%]">
              {/* Admin Sidebar */}
              <AdminSidebar />
              {/* Main Content Area */}
              <div className=" w-[88%] overflow-y-scroll scroll-hide">
                <Outlet />
              </div>
            </div>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashBoard />} />
        {/* Only Admin can access Users and Settings */}
        <Route
          path="users"
          element={<ProtectedRoute allowedRoles={["admin"]}><Users /></ProtectedRoute>}
        />
        <Route
          path="settings"
          element={<ProtectedRoute allowedRoles={["admin"]}><Settings /></ProtectedRoute>}
        />
        <Route path="flagged" element={<FlaggedContent />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="logs" element={<Logs />} />
      </Route>

      {/* Unprotected route for login */}
      <Route index element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminLayout;
