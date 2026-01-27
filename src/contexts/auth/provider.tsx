import { type PropsWithChildren, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import { getAccessToken } from "@/lib/tokenStorage";
import { authMutations, authService } from "@/services/auth";
import type { SigninRequest, SignupRequest } from "@/services/auth/types";
import type { User } from "@/types/user";

import { AuthContext } from "./context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const signinMutation = useMutation(authMutations.signin());
  const signupMutation = useMutation(authMutations.signup());

  const decodeToken = (accessToken: string) => {
    const decoded = jwtDecode<User>(accessToken);
    setUser({
      username: decoded.username,
      name: decoded.name,
    });
  };

  const signin = async (data: SigninRequest) => {
    const response = await signinMutation.mutateAsync(data);
    decodeToken(response.accessToken);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const signup = async (data: SignupRequest) => {
    await signupMutation.mutateAsync(data);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        let accessToken = getAccessToken();
        if (!accessToken) {
          const response = await authService.refresh();
          accessToken = response.accessToken;
        }
        if (accessToken) {
          decodeToken(accessToken);
        }
      } catch (error) {
        console.error("initAuth error", error);
      } finally {
        setIsInitializing(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signin,
        logout,
        signup,
        isSigningIn: signinMutation.isPending,
        isSigningUp: signupMutation.isPending,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
