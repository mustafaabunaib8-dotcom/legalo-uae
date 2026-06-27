import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

function StatsCard({ value, label, trend, icon, className, ...props }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--legalo-radius-lg)] bg-[var(--legalo-surface)] p-6",
        "shadow-[var(--legalo-shadow-card)]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-2">
        {icon && (
          <div className="p-2 rounded-[var(--legalo-radius-sm)] bg-[var(--legalo-primary)]/10 text-[var(--legalo-primary)]">
            {icon}
          </div>
        )}
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-[var(--legalo-ink)] mb-1">{value}</div>
      <div className="text-sm text-[var(--legalo-ink)]/70">{label}</div>
    </div>
  );
}

export { StatsCard };
