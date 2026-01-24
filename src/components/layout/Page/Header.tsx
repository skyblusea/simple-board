import type { PropsWithChildren, ReactNode } from "react";
import { useNavigate } from "react-router";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export interface PageHeaderProps {
  title?: string;
  description?: string;
  titleAction?: ReactNode;
  showBackButton?: boolean;
}

export function PageHeader({
  title,
  description,
  titleAction,
  showBackButton = false,
}: PropsWithChildren<PageHeaderProps>) {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="flex items-center justify-between border-b-1 border-black px-4 py-4">
      {showBackButton && (
        <Button
          variant="ghost"
          onClick={handleBack}
          render={<ChevronLeft strokeWidth={1.3} />}
          size="icon"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        ></Button>
      )}
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <Typography variant="title2">{title}</Typography>}
        </div>
      )}
      {titleAction}
    </div>
  );
}
