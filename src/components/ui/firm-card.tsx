"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { StarsRating } from "./stars-rating";
import { Button } from "./button";

export interface FirmCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  logo?: string;
  verified?: boolean;
  emirate?: string;
  yearsExperience?: number;
  rating?: number;
  reviewCount?: number;
  specializations?: string[];
  responseTime?: string;
  onViewProfile?: () => void;
  onRequestMatch?: () => void;
}

function FirmCard({
  name,
  logo,
  verified = false,
  emirate,
  yearsExperience,
  rating = 0,
  reviewCount = 0,
  specializations = [],
  responseTime,
  onViewProfile,
  onRequestMatch,
  className,
  ...props
}: FirmCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--legalo-radius-xl)] bg-[var(--legalo-surface)] p-6",
        "shadow-[var(--legalo-shadow-card)]",
        "transition-all duration-200 hover:shadow-[var(--legalo-shadow-elevated)]",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar src={logo} alt={name} seed={name} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg truncate">{name}</h3>
            {verified && <Badge variant="verified-gold">✦ Verified</Badge>}
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--legalo-ink)]/70">
            {emirate && <span>{emirate}</span>}
            {yearsExperience && <span>•</span>}
            {yearsExperience && <span>{yearsExperience} years exp.</span>}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarsRating value={rating} readOnly size="sm" />
            <span className="text-sm text-[var(--legalo-ink)]/70">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Specializations */}
      {specializations.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {specializations.slice(0, 3).map((spec, index) => (
            <Badge key={index} variant="jurisdiction">
              {spec}
            </Badge>
          ))}
        </div>
      )}

      {/* Response time */}
      {responseTime && (
        <p className="text-sm text-[var(--legalo-ink)]/60 mb-4">
          {responseTime}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="md"
          className="flex-1"
          onClick={onViewProfile}
        >
          View Profile
        </Button>
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          onClick={onRequestMatch}
        >
          Request Match
        </Button>
      </div>
    </div>
  );
}

export { FirmCard };
