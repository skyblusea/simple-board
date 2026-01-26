import { mutationOptions } from "@tanstack/react-query";

import { REFRESH_TOKEN_KEY } from "@/constants/auth";
import { http } from "@/lib/http";
import { setAccessToken } from "@/lib/tokenStorage";

import type { AuthResponse, RefreshTokenRequest, SigninRequest, SignupRequest } from "./types";

export const AUTH_API_URL = {
  signup: "auth/signup",
  signin: "auth/signin",
  refresh: "auth/refresh",
};

export const AUTH_ROOT_KEY = "AUTH";

export const authService = {
  signup: async (data: SignupRequest) => {
    return http.post(AUTH_API_URL.signup, data);
  },

  signin: async (data: SigninRequest) => {
    const response = await http.post<SigninRequest, AuthResponse>(AUTH_API_URL.signin, data);
    setAccessToken(response.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    return response.data;
  },

  logout: () => {
    setAccessToken(null);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  refresh: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) throw new Error("리프레시 토큰이 존재하지 않습니다.");

    const response = await http.post<RefreshTokenRequest, AuthResponse>("/auth/refresh", {
      refreshToken,
    });

    setAccessToken(response.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
  },
};

export const authMutations = {
  signin: () =>
    mutationOptions({
      mutationKey: [AUTH_ROOT_KEY, "signin"],
      mutationFn: (data: SigninRequest) => authService.signin(data),
    }),
  signup: () =>
    mutationOptions({
      mutationKey: [AUTH_ROOT_KEY, "signup"],
      mutationFn: (data: SignupRequest) => authService.signup(data),
    }),
};
