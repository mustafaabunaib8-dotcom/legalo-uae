"use client";

import * as React from "react";
import { cn, getInitials, hashColor } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  seed?: string;
  fallback?: string | React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  xs: "h-4 w-4 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const bgColors = [
  "bg-emerald-500/20",
  "bg-emerald-500/30",
  "bg-emerald-500/50",
];

const textColors = [
  "text-emerald-700",
  "text-emerald-800",
  "text-white",
];

function Avatar({
  src,
  alt,
  seed,
  fallback,
  size = "md",
  className,
  children,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);
  const showImage = src && !imgError;
  const colorIndex = seed ? hashColor(seed) : alt ? hashColor(alt) : 0;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium",
        sizeClasses[size],
        !showImage && bgColors[colorIndex],
        !showImage && textColors[colorIndex],
        className
      )}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || ""}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : typeof fallback === "string" ? (
        <span aria-hidden="true">{fallback}</span>
      ) : fallback ? (
        fallback
      ) : children ? (
        children
      ) : (
        <span aria-hidden="true">{(alt ? getInitials(alt) : "??")}</span>
      )}
    </div>
  );
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center", className)}
      {...props}
    />
  )
);
AvatarFallback.displayName = "AvatarFallback";

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onLoadingStatusChange, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onLoad={() => onLoadingStatusChange?.('loaded')}
      onError={() => onLoadingStatusChange?.('error')}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

export { Avatar, AvatarFallback, AvatarImage };
export default Avatar;
