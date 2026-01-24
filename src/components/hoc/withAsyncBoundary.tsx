import { type ComponentProps, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;
type SuspenseProps = ComponentProps<typeof Suspense>;
type ErrorBoundaryType = Omit<ErrorBoundaryProps, "fallback">;
type SuspenseType = Omit<SuspenseProps, "fallback">;

type AsyncBoundaryProps = ErrorBoundaryType &
  SuspenseType & {
    fallbackError: ErrorBoundaryProps["fallback"];
    fallbackLoading: SuspenseProps["fallback"];
  };

export const AsyncBoundary = ({
  fallbackError,
  fallbackLoading,
  children,
  name,
  onError,
  onReset,
  fallbackRender,
  resetKeys,
}: AsyncBoundaryProps) => {
  const errorBoundaryProps = {
    onError,
    onReset,
    resetKeys,
    ...(fallbackRender ? { fallbackRender } : { fallback: fallbackError }),
  };

  const suspenseProps = {
    name,
    fallback: fallbackLoading,
  };

  return (
    <ErrorBoundary {...errorBoundaryProps}>
      <Suspense {...suspenseProps}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export const withAsyncBoundary =
  <Props extends Record<string, unknown> = Record<string, never>>(
    Component: React.ComponentType<Props>,
    asyncBoundaryProps: AsyncBoundaryProps,
  ) =>
  (props: Props) => {
    return (
      <AsyncBoundary {...asyncBoundaryProps}>
        <Component {...props} />
      </AsyncBoundary>
    );
  };
