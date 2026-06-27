"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  sender?: string;
  isOwnMessage?: boolean;
  content: string;
  timestamp: Date | string;
  attachment?: {
    name: string;
    url: string;
    type?: string;
  };
}

function ChatBubble({
  sender,
  isOwnMessage = false,
  content,
  timestamp,
  attachment,
  className,
  ...props
}: ChatBubbleProps) {
  const timeStr = formatRelativeTime(timestamp);

  return (
    <div
      className={cn(
        "flex flex-col gap-1 max-w-[80%]",
        isOwnMessage ? "ms-auto items-end" : "me-auto items-start",
        className
      )}
      {...props}
    >
      {sender && !isOwnMessage && (
        <span className="text-xs font-medium text-[var(--legalo-ink)]/70 mb-1">
          {sender}
        </span>
      )}
      <div
        className={cn(
          "rounded-[var(--legalo-radius-lg)] px-4 py-2.5 text-sm",
          isOwnMessage
            ? "bg-[var(--legalo-primary)] text-white"
            : "bg-[var(--legalo-sand)] text-[var(--legalo-ink)]"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {attachment && (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block mt-2 text-xs underline",
              isOwnMessage ? "text-white/80" : "text-[var(--legalo-primary)]"
            )}
          >
            📎 {attachment.name}
          </a>
        )}
      </div>
      <span className="text-xs text-[var(--legalo-ink)]/50 mt-1">{timeStr}</span>
    </div>
  );
}

export { ChatBubble };
