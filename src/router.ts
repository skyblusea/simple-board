import { createBrowserRouter } from "react-router";

import { RootLayout } from "@/components/layout/RootLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { HomePage } from "@/pages/home";

export const routes = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
    ],
  },
]);
