import type { PropsWithChildren } from "react";

import { PageHeader, type PageHeaderProps } from "./PageHeader";

interface PageProps extends PageHeaderProps {}

export function PageComponent({
  title,
  titleAction,
  children,
  backTo,
  showBackButton = false,
}: PropsWithChildren<PageProps>) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {(title || titleAction || showBackButton) && (
        <PageHeader
          showBackButton={showBackButton}
          title={title}
          titleAction={titleAction}
          backTo={backTo}
        />
      )}
      {children}
    </div>
  );
}

export const Page = Object.assign(PageComponent, {
  Header: PageHeader,
});
