import { Link, useNavigate } from "react-router";

import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/auth/hooks";

import { Button } from "../ui/button";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("로그아웃 되었습니다.");
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">SimpleBoard</span>
        </Link>
        {user && (
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut data-icon="inline-end" />
            로그아웃
          </Button>
        )}
      </div>
    </header>
  );
}
