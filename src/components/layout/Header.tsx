import { Link } from "react-router";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">SimpleBoard</span>
        </Link>
      </div>
    </header>
  );
}
