import { createBrowserRouter } from "react-router";

import { ProtectedRouter } from "@/components/auth/ProtectedRouter";
import { RootLayout } from "@/components/layout/RootLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import { HomePage } from "@/pages/home";

export const routes = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignUpPage,
      },
      {
        path: "/",
        Component: ProtectedRouter,
        children: [
          {
            index: true,
            Component: HomePage,
          },
        ],
      },
    ],
  },
]);
