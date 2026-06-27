"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StarsRatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  maxStars?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

function Star({
  filled,
  half,
  size,
  interactive,
  onClick,
}: {
  filled: boolean;
  half?: boolean;
  size: "sm" | "md" | "lg";
  interactive?: boolean;
  onClick?: () => void;
}) {
  const goldColor = "var(--legalo-gold)";

  return (
    <svg
      className={cn(
        sizeClasses[size],
        interactive && "cursor-pointer hover:scale-110 transition-transform",
        "[@media(prefers-reduced-motion:reduce)]:hover:scale-100"
      )}
      viewBox="0 0 24 24"
      onClick={onClick}
      role={interactive ? "button" : undefined}
      aria-hidden={!interactive}
    >
      {half ? (
        <>
          <defs>
            <linearGradient id="halfFill">
              <stop offset="50%" stopColor={goldColor} />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
            fill="url(#halfFill)"
            stroke={goldColor}
            strokeWidth="1"
          />
        </>
      ) : (
        <path
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
          fill={filled ? goldColor : "transparent"}
          stroke={goldColor}
          strokeWidth="1"
        />
      )}
    </svg>
  );
}

function StarsRating({
  value = 0,
  maxStars = 5,
  readOnly = false,
  onChange,
  size = "md",
  showValue = false,
  className,
  ...props
}: StarsRatingProps) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    const filled = i <= Math.floor(value);
    const half = !filled && i === Math.ceil(value) && value % 1 !== 0;
    stars.push(
      <Star
        key={i}
        filled={filled}
        half={half}
        size={size}
        interactive={!readOnly}
        onClick={!readOnly && onChange ? () => onChange(i) : undefined}
      />
    );
  }

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role={!readOnly ? "radiogroup" : "img"}
      aria-label={`Rating: ${value} out of ${maxStars}`}
      {...props}
    >
      {stars}
      {showValue && (
        <span className="ms-1 text-sm font-medium text-[var(--legalo-ink)]">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export { StarsRating };
