import { type PropsWithChildren, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { authService } from "@/services/auth";
import type { SigninRequest, SignupRequest } from "@/services/auth/types";
import type { User } from "@/types/user";

import { AuthContext } from "./context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const signin = async (data: SigninRequest) => {
    const response = await authService.signin(data);
    const decoded = jwtDecode<User>(response.accessToken);
    setUser({
      username: decoded.username,
      name: decoded.name,
    });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const signup = async (data: SignupRequest) => {
    await authService.signup(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signin,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
