"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[var(--legalo-radius-md)] bg-[var(--legalo-surface)] px-3 py-2 text-sm",
          "border border-[var(--legalo-border)]",
          "placeholder:text-[var(--legalo-ink)]/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--legalo-primary)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200 resize-none",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
