import { CircleCheckIcon, CircleX, InfoIcon, Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" fill="var(--success)" stroke="white" />,
        info: <InfoIcon className="size-4" fill="var(--info)" stroke="white" />,
        warning: <TriangleAlertIcon className="size-4" fill="var(--warning)" stroke="white" />,
        error: <CircleX className="size-4" fill="var(--error)" stroke="white" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
