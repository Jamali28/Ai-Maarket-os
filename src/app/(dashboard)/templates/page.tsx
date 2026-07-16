"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Mail, MessageSquare, Camera, Smartphone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const templates = [
  {
    name: "Standard Product Description",
    type: "Description",
    description: "A comprehensive product description optimized for conversions and SEO.",
    icon: FileText,
    color: "text-indigo-500 bg-indigo-500/10",
    popular: true,
  },
  {
    name: "Flash Sale Email",
    type: "Email",
    description: "Urgent promotional email template for time-limited offers.",
    icon: Mail,
    color: "text-purple-500 bg-purple-500/10",
    popular: false,
  },
  {
    name: "Instagram Story Set",
    type: "Social",
    description: "Three-part Instagram story sequence for product launches.",
    icon: Camera,
    color: "text-pink-500 bg-pink-500/10",
    popular: false,
  },
  {
    name: "Google Shopping Ad",
    type: "Ads",
    description: "Optimized Google Shopping ad copy with all required fields.",
    icon: MessageSquare,
    color: "text-orange-500 bg-orange-500/10",
    popular: true,
  },
  {
    name: "SMS Abandoned Cart",
    type: "SMS",
    description: "Short SMS sequence to recover abandoned carts.",
    icon: Smartphone,
    color: "text-yellow-500 bg-yellow-500/10",
    popular: false,
  },
  {
    name: "SEO Mega Pack",
    type: "SEO",
    description: "Complete SEO bundle: title, meta, keywords, alt text, and schema.",
    icon: Sparkles,
    color: "text-emerald-500 bg-emerald-500/10",
    popular: true,
  },
];

const categories = ["All", "Description", "Email", "Social", "Ads", "SMS", "SEO"];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = templates.filter(
    (t) =>
      (category === "All" || t.type === category) &&
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-1">Pre-built content templates to get started faster.</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
                category === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/30 text-muted-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <Input
          placeholder="Search templates..."
          icon={<Search className="h-4 w-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((template, i) => (
          <motion.div
            key={template.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group cursor-pointer"
          >
            <Card className="h-full hover:border-primary/30 transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", template.color)}>
                    <template.icon className="h-5 w-5" />
                  </div>
                  {template.popular && (
                    <Badge variant="default" className="text-[10px]">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base mt-3">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {template.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
