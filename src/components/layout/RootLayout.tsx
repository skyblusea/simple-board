import { Outlet } from "react-router";
import { Header } from "./Header";

export function RootLayout() {
  return (
    <>
      <div className="bg-background flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <Outlet />
      </div>
      ;
    </>
  );
}
