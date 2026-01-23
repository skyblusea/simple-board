import type { User } from "@/types/user";

export interface SignupRequest extends User {
  password: string;
  confirmPassword: string;
}

export interface SigninRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
