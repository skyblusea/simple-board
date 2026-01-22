import { type PropsWithChildren, useState } from "react";

import type { User } from "@/types/user";

import { AuthContext } from "./context";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User | null) => {
    setUser(user);
  };

  const logout = () => {};

  const signup = (user: User | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
