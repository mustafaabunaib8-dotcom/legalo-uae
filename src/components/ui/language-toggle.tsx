"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LanguageToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  value?: "en" | "ar";
  onChange?: (lang: "en" | "ar") => void;
}

const LanguageToggle = React.forwardRef<HTMLButtonElement, LanguageToggleProps>(
  ({ value = "en", onChange, className, ...props }, ref) => {
    const handleClick = () => {
      const newValue = value === "en" ? "ar" : "en";
      onChange?.(newValue);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
          "bg-[var(--legalo-sand)] text-[var(--legalo-ink)]",
          "hover:bg-[var(--legalo-sand)]/80 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--legalo-primary)]",
          className
        )}
        onClick={handleClick}
        aria-label={`Switch to ${value === "en" ? "Arabic" : "English"}`}
        {...props}
      >
        <span className="text-base">{value === "en" ? "🇬🇧" : "🇦🇪"}</span>
        <span>{value === "en" ? "EN" : "AR"}</span>
      </button>
    );
  }
);
LanguageToggle.displayName = "LanguageToggle";

export { LanguageToggle };
