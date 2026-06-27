"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "destructive" | "gold" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variantClasses = {
      primary: "bg-[var(--legalo-primary)] text-white hover:bg-[var(--legalo-primary-hover)] active:bg-[var(--legalo-primary-pressed)] shadow-[var(--legalo-shadow-card)]",
      secondary: "border-2 border-[var(--legalo-sand)] text-[var(--legalo-ink)] hover:bg-[var(--legalo-sand)]/10 bg-transparent",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
      destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
      gold: "bg-[var(--legalo-gold)] text-[var(--legalo-ink)] hover:bg-[var(--legalo-gold)]/90 active:bg-[var(--legalo-gold)]/80 shadow-[var(--legalo-shadow-card)]",
      ghost: "border border-[var(--legalo-border)] text-[var(--legalo-ink)] hover:bg-[var(--legalo-sand)]/5 bg-transparent",
      outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 active:bg-gray-100",
    };

    const sizeClasses = {
      sm: "h-9 px-3 text-sm rounded-[var(--legalo-radius-sm)]",
      md: "h-10 px-4 text-base rounded-[var(--legalo-radius-md)]",
      lg: "h-12 px-6 text-lg rounded-[var(--legalo-radius-lg)]",
      icon: "h-10 w-10 rounded-full",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--legalo-primary)] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "[@media(prefers-reduced-motion:reduce)]:hover:scale-100 [@media(prefers-reduced-motion:reduce)]:active:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
