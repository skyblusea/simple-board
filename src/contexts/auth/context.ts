import { createContext } from "react";

import type { SigninRequest, SignupRequest } from "@/services/auth/types";
import type { User } from "@/types/user";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signin: (data: SigninRequest) => Promise<void>;
  logout: () => void;
  signup: (user: SignupRequest) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
