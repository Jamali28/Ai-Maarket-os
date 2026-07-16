"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const metrics = [
  { label: "Monthly Recurring Revenue", value: "$12,450", change: "+8.2%", up: true },
  { label: "Active Subscriptions", value: "432", change: "+23", up: true },
  { label: "Churn Rate", value: "4.2%", change: "-0.8%", up: false },
  { label: "Avg. Revenue Per User", value: "$28.82", change: "+5.1%", up: true },
];

export default function AdminRevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Revenue</h1>
        <p className="text-sm text-muted-foreground">Platform financial overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold">{m.value}</span>
                <span className={`flex items-center text-xs font-medium ${m.up ? "text-success" : "text-destructive"}`}>
                  {m.up ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                  {m.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-primary/20"
                  style={{ height: `${Math.max(20, 40 + Math.random() * 60)}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { plan: "Free", count: 180, percent: 42 },
                { plan: "Pro", count: 192, percent: 44 },
                { plan: "Business", count: 60, percent: 14 },
              ].map((item) => (
                <div key={item.plan}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.plan}</span>
                    <span className="text-muted-foreground">{item.count} users</span>
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
