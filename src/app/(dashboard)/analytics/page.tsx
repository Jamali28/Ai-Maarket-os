"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Generations",
    value: "47",
    change: "+12%",
    up: true,
  },
  {
    label: "This Month",
    value: "23",
    change: "+8%",
    up: true,
  },
  {
    label: "Avg. per Product",
    value: "3.9",
    change: "-2%",
    up: false,
  },
  {
    label: "Most Used Type",
    value: "Description",
    change: "30% of total",
    up: true,
  },
];

const typeBreakdown = [
  { type: "Descriptions", count: 12, percent: 26 },
  { type: "SEO Titles", count: 10, percent: 21 },
  { type: "Bullet Points", count: 8, percent: 17 },
  { type: "Keywords", count: 6, percent: 13 },
  { type: "Meta Descriptions", count: 5, percent: 11 },
  { type: "Alt Text", count: 4, percent: 9 },
  { type: "Ad Copy", count: 2, percent: 4 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your content generation activity.</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export CSV
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 sm:p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
                <span
                  className={cn(
                    "flex items-center text-xs font-medium",
                    stat.up ? "text-success" : "text-destructive"
                  )}
                >
                  {stat.up ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-primary/20 hover:bg-primary/30 transition-colors relative group"
                  style={{
                    height: `${Math.max(15, Math.random() * 100)}%`,
                  }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] text-muted-foreground whitespace-nowrap">
                    {Math.floor(Math.random() * 10)} gen
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>Jun 23</span>
              <span>Jun 30</span>
              <span>Jul 6</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content Type Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {typeBreakdown.map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.type}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
