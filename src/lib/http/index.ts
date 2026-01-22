import { createAxiosInstance } from "./createAxiosInstance";
import { wrapWithTypeSafety } from "./wrapWithTypeSafety";

export const axiosInstance = createAxiosInstance();
export const http = wrapWithTypeSafety(axiosInstance);
