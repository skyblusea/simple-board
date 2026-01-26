import { type PropsWithChildren, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import { authMutations, authService } from "@/services/auth";
import type { SigninRequest, SignupRequest } from "@/services/auth/types";
import type { User } from "@/types/user";

import { AuthContext } from "./context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const signinMutation = useMutation(authMutations.signin());
  const signupMutation = useMutation(authMutations.signup());

  const signin = async (data: SigninRequest) => {
    const response = await signinMutation.mutateAsync(data);
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
    await signupMutation.mutateAsync(data);
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
