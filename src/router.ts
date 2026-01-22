import { HomePage } from "@/pages/home";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";

export const routes = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);
