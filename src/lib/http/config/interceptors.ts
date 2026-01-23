import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

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
      if (error.response?.status === 401 && !originalRequest._retry) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
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
          setAccessToken(null);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        setAccessToken(null);
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );
};
