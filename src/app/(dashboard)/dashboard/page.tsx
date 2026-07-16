"use client";

import { motion } from "framer-motion";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { QuickStart } from "@/components/dashboard/quick-start";
import { RecentGenerations } from "@/components/dashboard/recent-generations";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s your marketing overview.
          </p>
        </div>
      </motion.div>

      <QuickStart />

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentGenerations />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageMeter used={23} limit={100} plan="Pro Plan" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Summer Collection", "New Arrivals", "Bestsellers"].map((project) => (
                  <div
                    key={project}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-xs font-medium">
                      {project.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{project}</p>
                      <p className="text-xs text-muted-foreground">3 products</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
