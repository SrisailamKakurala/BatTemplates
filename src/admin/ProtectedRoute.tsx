import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode; // Allow children to be passed
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const authStorage = localStorage.getItem("auth-storage");

  if (!authStorage) {
    return <Navigate to="/admin" />;
  }

  const authData = JSON.parse(authStorage);
  const isAuthenticated = authData?.state?.isAuthenticated ?? false;
  const userRoles = authData?.state?.user?.roles ?? [];

  if (!isAuthenticated || !allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/admin" />;
  }

  // Render children or Outlet if the user has the required roles
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
