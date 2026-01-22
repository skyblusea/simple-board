import { createContext } from "react";

import type { User } from "@/types/user";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User | null) => void;
  logout: () => void;
  signup: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  signup: () => {},
});
