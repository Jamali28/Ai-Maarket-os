"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Search, FileText, CreditCard, Settings, HelpCircle, MessageSquare } from "lucide-react";

const articles = [
  {
    title: "Getting Started",
    description: "Learn how to upload your first product and generate content.",
    icon: FileText,
    category: "Basics",
  },
  {
    title: "Understanding Brand Voices",
    description: "How to configure and use different brand voice variants.",
    icon: Settings,
    category: "Basics",
  },
  {
    title: "Billing & Plans",
    description: "Compare plans and manage your subscription.",
    icon: CreditCard,
    category: "Account",
  },
  {
    title: "Troubleshooting",
    description: "Common issues and how to resolve them.",
    icon: HelpCircle,
    category: "Support",
  },
  {
    title: "Shopify Integration",
    description: "Connect your store and push content directly.",
    icon: MessageSquare,
    category: "Integrations",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Help Center</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            How can we help you today?
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <Input
              placeholder="Search articles..."
              icon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles
            .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
            .map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full cursor-pointer hover:border-primary/30 transition-all">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <article.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help.
          </p>
          <div className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card px-6 py-4">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Contact Support</span>
            <span className="text-xs text-muted-foreground">Average response: 2 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
