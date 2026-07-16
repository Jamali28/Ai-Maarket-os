"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Try it out, see the magic.",
    features: [
      { included: true, text: "5 generations per month" },
      { included: true, text: "8 content types" },
      { included: true, text: "1 brand voice" },
      { included: true, text: "Copy & CSV export" },
      { included: false, text: "Shopify integration" },
      { included: false, text: "Ad & email generation" },
      { included: false, text: "Analytics" },
    ],
    cta: "Get Started",
    href: "/register",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For serious sellers who launch frequently.",
    features: [
      { included: true, text: "Unlimited generations" },
      { included: true, text: "16 content types" },
      { included: true, text: "5 brand voices" },
      { included: true, text: "All export formats" },
      { included: true, text: "Shopify direct push" },
      { included: true, text: "Ads, emails & SMS" },
      { included: true, text: "30-day analytics" },
    ],
    cta: "Start Free Trial",
    href: "/register?plan=pro",
    popular: true,
  },
  {
    name: "Business",
    price: 99,
    description: "For teams and high-volume sellers.",
    features: [
      { included: true, text: "Everything in Pro" },
      { included: true, text: "5 team members" },
      { included: true, text: "10 brand voices" },
      { included: true, text: "Priority support" },
      { included: true, text: "1-year analytics history" },
      { included: true, text: "Bulk CSV import/export" },
      { included: true, text: "API access (500 req/hr)" },
    ],
    cta: "Start Free Trial",
    href: "/register?plan=business",
    popular: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free. Upgrade when you need more. No hidden fees.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                !annual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                annual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual{" "}
              <span className="text-xs opacity-80">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border p-8 transition-all duration-300",
                plan.popular
                  ? "border-primary/50 bg-card shadow-xl shadow-primary/5 scale-105"
                  : "border-border/50 bg-card hover:border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${annual ? Math.round(plan.price * 0.8) : plan.price}
                </span>
                <span className="text-muted-foreground text-sm">/month</span>
                {plan.price > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {annual ? `$${plan.price * 12 * 0.8}/year` : `$${plan.price * 12}/year`}
                  </p>
                )}
              </div>
              <Link href={plan.href}>
                <Button
                  className="w-full mb-6"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground/60"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
