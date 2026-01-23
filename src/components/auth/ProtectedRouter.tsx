import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/contexts/auth/hooks";

export function ProtectedRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
