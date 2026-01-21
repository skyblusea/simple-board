import { HomePage } from "@/pages/home";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    index: true,
    Component: HomePage,
  },
]);
