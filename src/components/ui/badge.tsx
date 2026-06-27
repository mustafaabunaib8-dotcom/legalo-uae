import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "jurisdiction" | "risk-low" | "risk-med" | "risk-high" | "verified-gold" | "match-score" | "status" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-[var(--legalo-sand)] text-[var(--legalo-ink)]",
    secondary: "bg-[var(--legalo-sand)]/50 text-[var(--legalo-ink)] border border-[var(--legalo-border)]",
    jurisdiction: "bg-[var(--legalo-primary)]/10 text-[var(--legalo-primary)] border border-[var(--legalo-primary)]/20",
    "risk-low": "bg-green-100 text-green-800 border border-green-200",
    "risk-med": "bg-yellow-100 text-yellow-800 border border-yellow-200",
    "risk-high": "bg-red-100 text-red-800 border border-red-200",
    "verified-gold": "bg-[var(--legalo-gold)]/20 text-[var(--legalo-gold)] border border-[var(--legalo-gold)]/30",
    "match-score": "bg-[var(--legalo-primary)] text-white",
    status: "bg-[var(--legalo-surface)] text-[var(--legalo-ink)] border border-[var(--legalo-border)]",
    outline: "text-[var(--legalo-ink)] border border-[var(--legalo-border)] bg-transparent",
  };

  const showIcon = variant === "verified-gold";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {showIcon && <span aria-hidden="true">✦</span>}
      {props.children}
    </div>
  );
}

export { Badge };
