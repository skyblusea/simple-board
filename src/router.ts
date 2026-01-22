import { createBrowserRouter } from "react-router";

import { ProtectedRouter } from "@/components/auth/ProtectedRouter";
import { RootLayout } from "@/components/layout/RootLayout";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login/LoginPage";
import { SignUpPage } from "@/pages/signup/SignUpPage";

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
