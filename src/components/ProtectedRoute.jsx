
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, role, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/auth/login" replace />;


  // if (allowedRoles && !allowedRoles.includes(role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children; // ✅ Render the protected layout or page
}
