import { RouterProvider } from "react-router";
import { routes } from "./router";

export default function App() {
  return <RouterProvider router={routes} />;
}
