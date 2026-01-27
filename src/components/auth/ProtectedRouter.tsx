import { Navigate, Outlet } from "react-router";

import { Loader2Icon } from "lucide-react";

import { useAuth } from "@/contexts/auth/hooks";

export function ProtectedRouter() {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="mx-auto flex h-screen items-center justify-center">
        <Loader2Icon className="size-4 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
