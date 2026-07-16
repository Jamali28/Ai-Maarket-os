"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface UsageMeterProps {
  used: number;
  limit: number;
  plan: string;
  className?: string;
}

export function UsageMeter({ used, limit, plan, className }: UsageMeterProps) {
  const percentage = limit === -1 ? 0 : Math.min((used / limit) * 100, 100);
  const isUnlimited = limit === -1;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {isUnlimited ? "Generations used" : "Generations this month"}
        </span>
        <span className="font-medium">
          {isUnlimited ? `${used} total` : `${used} / ${limit}`}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isUnlimited ? "100%" : `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full transition-all",
            percentage > 80
              ? "bg-destructive"
              : percentage > 50
              ? "bg-warning"
              : "bg-primary"
          )}
        />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{plan}</span>
        {percentage > 75 && !isUnlimited && (
          <span className="flex items-center gap-1 text-warning">
            <Sparkles className="h-3 w-3" />
            Upgrade to continue generating
          </span>
        )}
      </div>
    </div>
  );
}
