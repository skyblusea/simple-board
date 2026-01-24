import { createBrowserRouter } from "react-router";

import { ProtectedRouter } from "@/components/auth/ProtectedRouter";
import { RootLayout } from "@/components/layout/RootLayout";
import { PostListPage } from "@/pages/board/list/PostListPage";
import { LoginPage } from "@/pages/login/LoginPage";
import { SignupPage } from "@/pages/signup/Page";

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
        Component: SignupPage,
      },
      {
        path: "/",
        Component: ProtectedRouter,
        children: [
          {
            index: true,
            Component: PostListPage,
          },
        ],
      },
    ],
  },
]);
