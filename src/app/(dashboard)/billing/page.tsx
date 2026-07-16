"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { Check, X, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: 0,
    current: true,
    planId: null,
    features: ["5 generations/mo", "8 content types", "1 brand voice", "Copy & CSV export"],
    missing: ["Shopify integration", "Ad & email generation", "Analytics"],
  },
  {
    name: "Pro",
    price: 29,
    current: false,
    popular: true,
    planId: process.env.NEXT_PUBLIC_WHOP_PRO_PLAN_ID || "plan_pro",
    features: [
      "Unlimited generations",
      "16 content types",
      "5 brand voices",
      "Shopify direct push",
      "Ads, emails & SMS",
      "30-day analytics",
    ],
    missing: [],
  },
  {
    name: "Business",
    price: 99,
    current: false,
    planId: process.env.NEXT_PUBLIC_WHOP_BUSINESS_PLAN_ID || "plan_business",
    features: [
      "Everything in Pro",
      "5 team members",
      "10 brand voices",
      "Priority support",
      "1-year analytics",
      "500 req/hr API",
    ],
    missing: [],
  },
];

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planId: string, planName: string) => {
    setLoading(planName);
    try {
      const res = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      window.location.href = url;
    } catch {
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and usage.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Free Plan</h3>
                <p className="text-sm text-muted-foreground">5 generations per month</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <UsageMeter used={3} limit={5} plan="Free Plan" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Payments are processed securely by{" "}
              <a
                href="https://whop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Whop <ExternalLink className="h-3 w-3" />
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              Your subscription is managed through Whop. You can cancel anytime.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative",
              plan.popular && "border-primary/50 shadow-lg shadow-primary/5"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium px-4 py-1 rounded-full">
                  Recommended
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.missing?.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/60">
                    <X className="h-4 w-4 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button
                  className="w-full gap-2"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => plan.planId && handleUpgrade(plan.planId, plan.name)}
                  loading={loading === plan.name}
                >
                  <Sparkles className="h-4 w-4" />
                  Upgrade to {plan.name}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
