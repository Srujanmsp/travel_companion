import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePlan } from "../context/PlanContext"; // Only if using hasStartedPlanning

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  // Uncomment below ONLY if you want the "must start planning" check:
  // const { hasStartedPlanning } = usePlan();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    // Block anyone not logged in
    return <Navigate to="/start-planning" replace state={{ from: location.pathname }} />;
  }

  // // Uncomment this block ONLY if you want to force planning funnel:
  // if (location.pathname.startsWith("/planning") && !hasStartedPlanning) {
  //   return <Navigate to="/start-planning" replace />;
  // }

  return <Outlet />;
}
