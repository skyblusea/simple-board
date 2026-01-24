import { cn } from "@/lib/utils";

import { DEFAULT_TAG_BY_VARIANT, TYPOGRAPHY_VARIANTS, type TypographyVariant } from "./variants";

export type TypographyProps<TElement extends React.ElementType = "p"> = {
  variant: TypographyVariant;
  as?: TElement;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<TElement>, "as" | "className">;

export function Typography<TElement extends React.ElementType = "p">({
  variant,
  as,
  className,
  ...props
}: TypographyProps<TElement>) {
  const Component = (as ?? DEFAULT_TAG_BY_VARIANT[variant] ?? "p") as React.ElementType;

  return <Component className={cn(TYPOGRAPHY_VARIANTS[variant], className)} {...props} />;
}
