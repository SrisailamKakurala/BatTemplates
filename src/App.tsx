import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/admin/AdminLayout";

console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* User Layout */}
        <Route path="/*" element={<UserLayout />} />

        {/* Admin Layout */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
