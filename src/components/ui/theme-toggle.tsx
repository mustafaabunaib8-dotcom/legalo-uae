"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

export interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  theme?: "light" | "dark" | "system";
  onChange?: (theme: "light" | "dark" | "system") => void;
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ theme = "system", onChange, className, ...props }, ref) => {
    const handleClick = () => {
      const themes = ["light", "dark", "system"] as const;
      const currentIndex = themes.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      onChange?.(themes[nextIndex]);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 rounded-full",
          "bg-[var(--legalo-sand)] text-[var(--legalo-ink)]",
          "hover:bg-[var(--legalo-sand)]/80 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--legalo-primary)]",
          className
        )}
        onClick={handleClick}
        aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} theme`}
        {...props}
      >
        {theme === "light" && <Sun className="h-5 w-5" />}
        {theme === "dark" && <Moon className="h-5 w-5" />}
        {theme === "system" && (
          <div className="flex items-center gap-0.5">
            <Sun className="h-3 w-3" />
            <Moon className="h-3 w-3" />
          </div>
        )}
      </button>
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
