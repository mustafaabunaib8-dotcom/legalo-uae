"use client";

import * as React from "react";
import { cn, formatDate } from "@/lib/utils";
import { StarsRating } from "./stars-rating";

export interface CategoryScore {
  label: string;
  value: number;
  max?: number;
}

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  categoryScores?: CategoryScore[];
  testimonial: string;
  reviewerName: string;
  caseType?: string;
  date: Date | string;
}

function ReviewCard({
  rating,
  categoryScores = [],
  testimonial,
  reviewerName,
  caseType,
  date,
  className,
  ...props
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--legalo-radius-lg)] bg-[var(--legalo-surface)] p-6",
        "shadow-[var(--legalo-shadow-card)]",
        className
      )}
      {...props}
    >
      {/* Overall rating */}
      <div className="flex items-center gap-2 mb-4">
        <StarsRating value={rating} readOnly size="md" />
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      </div>

      {/* Testimonial */}
      <blockquote className="text-sm text-[var(--legalo-ink)]/80 mb-4 italic">
        &ldquo;{testimonial}&rdquo;
      </blockquote>

      {/* Category scores */}
      {categoryScores.length > 0 && (
        <div className="space-y-2 mb-4">
          {categoryScores.map((score, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs text-[var(--legalo-ink)]/70 w-24 flex-shrink-0">
                {score.label}
              </span>
              <div className="flex-1 h-2 bg-[var(--legalo-sand)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--legalo-primary)] rounded-full transition-all duration-300"
                  style={{ width: `${(score.value / (score.max || 5)) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8">
                {(score.value / (score.max || 5)).toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reviewer info */}
      <div className="flex items-center justify-between text-xs text-[var(--legalo-ink)]/60 pt-4 border-t border-[var(--legalo-border)]">
        <div>
          <span className="font-medium">{reviewerName}</span>
          {caseType && <span className="ms-2">• {caseType}</span>}
        </div>
        <time>{formatDate(date)}</time>
      </div>
    </div>
  );
}

export { ReviewCard };
