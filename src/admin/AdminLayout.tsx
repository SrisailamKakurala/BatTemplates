import { Route, Routes } from "react-router-dom";
import AdminDashBoard from "@/admin/pages/dashboard/AdminDashBoard";
import Users from "@/admin/pages/users/Users";
import Content from "@/admin/pages/content/Content";
import FlaggedContent from "@/admin/pages/flaggedContent/FlaggedContent";
import Analytics from "@/admin/pages/analytics/Analytics";
import Settings from "@/admin/pages/settings/Settings";
import Logs from "@/admin/pages/logs/Logs";
import Contributors from "@/admin/pages/contributors/Contributors";
import AdminLogin from "@/admin/pages/login/AdminLogin";
import ProtectedRoute from "@/admin/ProtectedRoute";

const AdminLayout = () => {
  return (
    <Routes>
      {/* Protected Route for all routes except /login */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'member']}/>}>
        <Route path="dashboard" element={<AdminDashBoard />} />
        <Route path="users" element={<Users />} />
        <Route path="templates" element={<Content />} />
        <Route path="flagged" element={<FlaggedContent />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="settings" element={<Settings />} />
        <Route path="logs" element={<Logs />} />
      </Route>

      {/* Unprotected route for login */}
      <Route index element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminLayout;
