import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--legalo-radius-lg)] bg-[var(--legalo-surface)] text-[var(--legalo-ink)] shadow-[var(--legalo-shadow-card)]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-[var(--legalo-ink)]/70", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

// Trust Card — emerald-tinted border with gradient overlay
const TrustCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--legalo-radius-lg)] relative overflow-hidden",
        "border-2 border-[var(--legalo-primary)]/30",
        "bg-[var(--legalo-surface)] shadow-[var(--legalo-shadow-card)]",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, var(--legalo-primary) 0%, transparent 50%)",
        }}
      />
      <div className="relative">{props.children}</div>
    </div>
  )
);
TrustCard.displayName = "TrustCard";

// Elevated Card — deeper shadow
const ElevatedCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--legalo-radius-lg)] bg-[var(--legalo-surface)] text-[var(--legalo-ink)]",
        "shadow-[var(--legalo-shadow-elevated)]",
        className
      )}
      {...props}
    />
  )
);
ElevatedCard.displayName = "ElevatedCard";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, TrustCard, ElevatedCard };
