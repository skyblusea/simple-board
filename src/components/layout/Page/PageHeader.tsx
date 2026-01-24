import type { PropsWithChildren, ReactNode } from "react";
import { useNavigate } from "react-router";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export interface PageHeaderProps {
  title?: string;
  titleAction?: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
}

export function PageHeader({
  title,
  titleAction,
  showBackButton = false,
  backTo,
}: PropsWithChildren<PageHeaderProps>) {
  const navigate = useNavigate();
  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex min-h-[80px] items-center justify-between border-b-1 border-black px-4 py-4">
      {showBackButton && (
        <Button
          variant="ghost"
          onClick={handleBack}
          size="icon"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="size-8" strokeWidth={1.5} />
        </Button>
      )}
      {title && (
        <div className="flex flex-col gap-1">
          <Typography variant="title2">{title}</Typography>
        </div>
      )}
      {titleAction}
    </div>
  );
}
