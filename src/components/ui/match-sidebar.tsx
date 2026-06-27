"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./progress-ring";
import { Badge } from "./badge";

export interface MatchSidebarItem {
  id: string;
  firmName: string;
  matchScore: number;
  specializations: string[];
  onViewProfile?: () => void;
}

export interface MatchSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  matches: MatchSidebarItem[];
  title?: string;
}

function MatchSidebar({ matches, title = "Top Matches", className, ...props }: MatchSidebarProps) {
  const topMatchId = matches.length > 0 ? matches[0].id : null;

  return (
    <div
      className={cn(
        "rounded-[var(--legalo-radius-lg)] bg-[var(--legalo-surface)] p-6",
        "shadow-[var(--legalo-shadow-card)]",
        className
      )}
      {...props}
    >
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="flex flex-col gap-4">
        {matches.map((match) => {
          const isTopMatch = match.id === topMatchId;

          return (
            <div
              key={match.id}
              className={cn(
                "rounded-[var(--legalo-radius-md)] p-4 transition-all duration-300",
                isTopMatch
                  ? "bg-[var(--legalo-primary)]/5 border-2 border-[var(--legalo-primary)]/30 shadow-[0_0_20px_rgba(13,138,117,0.3)] animate-[glow-ring_2s_ease-in-out_infinite]"
                  : "border border-[var(--legalo-border)] hover:border-[var(--legalo-primary)]/30"
              )}
              style={
                isTopMatch
                  ? {
                      animation: "glow-ring 2s ease-in-out infinite",
                    }
                  : undefined
              }
            >
              <div className="flex items-start gap-3 mb-3">
                <ProgressRing value={match.matchScore} size={48} strokeWidth={4} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{match.firmName}</h4>
                  {match.specializations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {match.specializations.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="jurisdiction" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {match.onViewProfile && (
                <button
                  onClick={match.onViewProfile}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isTopMatch
                      ? "text-[var(--legalo-primary)] hover:text-[var(--legalo-primary-hover)]"
                      : "text-[var(--legalo-ink)]/70 hover:text-[var(--legalo-primary)]"
                  )}
                >
                  View Profile →
                </button>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes glow-ring {
          0%, 100% {
            border-color: rgba(13, 138, 117, 0.3);
            box-shadow: 0 0 20px rgba(13, 138, 117, 0.3);
          }
          50% {
            border-color: rgba(13, 138, 117, 0.5);
            box-shadow: 0 0 30px rgba(13, 138, 117, 0.5);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate\\[glow-ring_2s_ease-in-out_infinite\\] {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export { MatchSidebar };
