import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";

import App from "./App.tsx";
import { AuthProvider } from "./contexts/auth/provider";
import "./index.css";
import { isLikelyTokenError } from "./lib/isLikelyTokenError.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            return false;
          }
          if (isLikelyTokenError(error)) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
