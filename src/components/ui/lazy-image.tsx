import { useState } from "react";

import { cn } from "@/lib/utils";

type LazyImageProps = {
  src: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
};

export function LazyImage({ src, alt = "", aspectRatio = "16/9", className }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio }}>
      {!loaded && <div className="bg-muted absolute inset-0 animate-pulse" />}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
