import { Link } from "react-router";

import { Typography } from "@/components/ui/typography";

interface PostNavigationProps {
  type: "prev" | "next";
  title: string;
  to: string;
}

export function PostNavigation({ title, type, to }: PostNavigationProps) {
  return (
    <Link
      to={to}
      className="hover:bg-muted/50 -mx-4 flex cursor-pointer items-center justify-between px-4 py-3 transition-colors"
    >
      <Typography variant="caption1" className="text-muted-foreground">
        {type === "prev" ? "이전글" : "다음글"}
      </Typography>
      <Typography variant="label2" className="max-w-xs truncate">
        {title}
      </Typography>
    </Link>
  );
}
