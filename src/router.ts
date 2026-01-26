import { createBrowserRouter } from "react-router";

import { ProtectedRouter } from "@/components/auth/ProtectedRouter";
import { RootLayout } from "@/components/layout/RootLayout";
import { LoginPage } from "@/pages/login/LoginPage";
import { PostCreatePage } from "@/pages/post/create/PostCreatePage";
import { PostDetailPage } from "@/pages/post/detail/PostDetailPage";
import { PostEditPage } from "@/pages/post/edit/PostEditPage";
import { PostListPage } from "@/pages/post/list/PostListPage";
import { SignupPage } from "@/pages/signup/SignupPage";

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
          {
            path: ":id",
            Component: PostDetailPage,
          },
          {
            path: "new",
            Component: PostCreatePage,
          },
          {
            path: "edit/:id",
            Component: PostEditPage,
          },
        ],
      },
    ],
  },
]);
