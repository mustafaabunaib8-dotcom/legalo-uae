"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function ProgressRing({
  value,
  size = 80,
  strokeWidth = 6,
  color,
  duration = 1000,
  showValue = true,
  formatValue,
  className,
  ...props
}: ProgressRingProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const offset = circumference - (progress / 100) * circumference;
  const reducedMotion = React.useRef(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  React.useEffect(() => {
    if (reducedMotion.current) {
      setDisplayValue(value);
      setProgress(value);
      return;
    }

    let startTime: number;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeOutCubic(t);

      const currentValue = easedT * value;
      setDisplayValue(Math.round(currentValue));
      setProgress(currentValue);

      if (t < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [value, duration]);

  const strokeColor = color || "var(--legalo-primary)";
  const displayText = formatValue ? formatValue(displayValue) : `${displayValue}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${value}%`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--legalo-sand)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-opacity duration-200"
        />
      </svg>
      {showValue && (
        <span
          className="absolute inset-0 flex items-center justify-center font-semibold text-sm"
          style={{ color: strokeColor }}
        >
          {displayText}
        </span>
      )}
    </div>
  );
}

export { ProgressRing };
