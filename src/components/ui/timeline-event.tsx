import * as React from "react";
import { cn, formatDate } from "@/lib/utils";

export interface TimelineEventProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  timestamp: Date | string;
  description?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

function TimelineEvent({
  icon,
  title,
  timestamp,
  description,
  isFirst = false,
  isLast = false,
  className,
  ...props
}: TimelineEventProps) {
  return (
    <div className={cn("flex gap-4", className)} {...props}>
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0",
            "bg-[var(--legalo-primary)]/10 text-[var(--legalo-primary)]",
            "border-2 border-[var(--legalo-primary)]/20"
          )}
        >
          {icon || (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="4" />
            </svg>
          )}
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-[var(--legalo-border)] my-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        {description && (
          <p className="text-sm text-[var(--legalo-ink)]/70 mb-1">{description}</p>
        )}
        <time className="text-xs text-[var(--legalo-ink)]/50">
          {formatDate(timestamp)}
        </time>
      </div>
    </div>
  );
}

export { TimelineEvent };
