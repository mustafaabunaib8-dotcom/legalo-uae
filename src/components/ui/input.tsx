"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, errorMessage, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-[var(--legalo-radius-md)] bg-[var(--legalo-surface)] px-3 py-2 text-sm",
            "border border-[var(--legalo-border)]",
            "placeholder:text-[var(--legalo-ink)]/40",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--legalo-primary)] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          aria-invalid={error}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
