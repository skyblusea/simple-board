import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { headerConfigs } from "./headers";

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.defaults.headers.common = headerConfigs.default;

  // Request
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
};
