import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "../auth";

export default function AdminOnly({ children }) {
  const saved = authStore.get();
  const loc = useLocation();
  const role = saved?.user?.role;
  if (!saved?.token) return <Navigate to="/" state={{ from: loc.pathname }} replace />;
  return role === "admin" ? children : <Navigate to="/dashboard" replace />;
}
