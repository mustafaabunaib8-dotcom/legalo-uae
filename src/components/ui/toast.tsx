"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export interface ToastProps {
  variant?: "success" | "error" | "info";
  title?: string;
  message?: string;
  onDismiss?: () => void;
  duration?: number;
}

const variantClasses = {
  success: "bg-green-50 border-green-200 text-green-900",
  error: "bg-red-50 border-red-200 text-red-900",
  info: "bg-blue-50 border-blue-200 text-blue-900",
};

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

function Toast({
  variant = "info",
  title,
  message,
  onDismiss,
  duration = 5000,
}: ToastProps) {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const Icon = iconMap[variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[var(--legalo-radius-md)] border p-4 shadow-lg",
        "animate-in fade-in-0 slide-in-from-top-2",
        variantClasses[variant]
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

// Toast container
interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (index: number) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 end-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          {...toast}
          onDismiss={() => onDismiss(index)}
        />
      ))}
    </div>
  );
}

export { Toast, ToastContainer };
