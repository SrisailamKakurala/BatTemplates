import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const authStorage = localStorage.getItem("auth-storage");

  // If authStorage is null or malformed, redirect to login
  if (!authStorage) {
    return <Navigate to="/admin" />;
  }

  const authData = JSON.parse(authStorage);
  const isAuthenticated = authData?.state?.isAuthenticated ?? false;
  const userRoles = authData?.state?.user?.roles ?? [];

  // If user is not authenticated or doesn't have the required role, redirect to login
  if (!isAuthenticated || !allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/admin" />;
  }

  // If the user is authenticated and has the required role, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
