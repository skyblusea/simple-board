import type { PropsWithChildren } from "react";

import { PageHeader, type PageHeaderProps } from "./Header";

interface PageProps extends PageHeaderProps {}

export function Page({
  title,
  description,
  titleAction,
  children,
  backTo,
  showBackButton = false,
}: PropsWithChildren<PageProps>) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {(title || description || titleAction || showBackButton) && (
        <PageHeader
          showBackButton={showBackButton}
          title={title}
          description={description}
          titleAction={titleAction}
          backTo={backTo}
        />
      )}
      {children}
    </div>
  );
}
