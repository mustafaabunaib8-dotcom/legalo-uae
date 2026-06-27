import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

function TypingIndicator({ size = "md", className, ...props }: TypingIndicatorProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="status"
      aria-label="Typing..."
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "rounded-full bg-[var(--legalo-primary)]",
            sizeClasses[size],
            "animate-typing-bounce"
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-6px);
          }
        }
        .animate-typing-bounce {
          animation: typing-bounce 1.4s infinite ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-typing-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export { TypingIndicator };
