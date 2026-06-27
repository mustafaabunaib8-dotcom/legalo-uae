"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ active = false, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--legalo-primary)]",
          "[@media(prefers-reduced-motion:reduce)]:hover:scale-100",
          active
            ? "bg-[var(--legalo-primary)] text-white shadow-sm hover:bg-[var(--legalo-primary-hover)]"
            : "bg-[var(--legalo-sand)] text-[var(--legalo-ink)] hover:bg-[var(--legalo-sand)]/80",
          "hover:scale-105 active:scale-95",
          className
        )}
        aria-pressed={active}
        {...props}
      >
        {children}
      </button>
    );
  }
);
FilterChip.displayName = "FilterChip";

export { FilterChip };
