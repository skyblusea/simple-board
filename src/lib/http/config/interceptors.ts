import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { toast } from "sonner";

import { REFRESH_TOKEN_KEY } from "@/constants/auth";
import { getAccessToken, setAccessToken } from "@/lib/tokenStorage";
import { AUTH_API_URL } from "@/services/auth";

import { headerConfigs } from "./headers";

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.defaults.headers.common = headerConfigs.default;

  // Request
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      const isUnauthorized = error.response?.status === 401;
      const isForbidden = error.response?.status === 403;
      const hasNotRetried = !originalRequest._retry;

      if (isUnauthorized) {
        toast.error("접근 권한이 없습니다. 로그인 후 다시 시도해주세요.");
        setAccessToken(null);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isForbidden && hasNotRetried) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
          setAccessToken(null);
          toast.error("로그인이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/${AUTH_API_URL.refresh}`,
            {
              refreshToken,
            },
          );
          setAccessToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          toast.error("로그인이 만료되었습니다. 다시 로그인해주세요.");
          setAccessToken(null);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );
};
