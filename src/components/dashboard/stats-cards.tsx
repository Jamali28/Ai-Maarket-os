"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FileText, Sparkles, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Total Generations",
    value: "47",
    trend: "+12%",
    icon: Sparkles,
    color: "text-indigo-500 bg-indigo-500/10",
  },
  {
    label: "Active Products",
    value: "12",
    trend: "+3",
    icon: FileText,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    label: "Saved Templates",
    value: "8",
    trend: "",
    icon: Clock,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    label: "This Month",
    value: "23",
    trend: "+8%",
    icon: TrendingUp,
    color: "text-rose-500 bg-rose-500/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-border/50 bg-card p-4 sm:p-5 hover:border-border transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", stat.color)}>
              <stat.icon className="h-4 w-4" />
            </div>
            {stat.trend && (
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
