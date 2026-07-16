"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Search,
  Mail,
  MessageSquare,
  Camera,
  Smartphone,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Download,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Advanced AI analyzes your product and generates professional marketing copy across every channel.",
  },
  {
    icon: FileText,
    title: "Product Descriptions",
    description: "Compelling, SEO-optimized descriptions that convert browsers into buyers.",
  },
  {
    icon: Search,
    title: "SEO Metadata",
    description: "Optimized titles, meta descriptions, and keywords to rank higher in search results.",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description: "Launch emails, promotional campaigns, and marketing sequences ready to send.",
  },
  {
    icon: MessageSquare,
    title: "Ad Copy",
    description: "Google, Facebook, and Instagram ads crafted for maximum conversion.",
  },
  {
    icon: Camera,
    title: "Social Content",
    description: "Instagram, TikTok, and Pinterest posts optimized for each platform.",
  },
  {
    icon: Smartphone,
    title: "SMS Marketing",
    description: "Short, punchy SMS campaigns with clear calls-to-action.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track your content performance and optimize your marketing strategy.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate a complete marketing campaign in seconds, not hours.",
  },
  {
    icon: Shield,
    title: "Brand Consistent",
    description: "Multiple brand voices keep your messaging consistent across every channel.",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "Works with Shopify, WooCommerce, Amazon, Etsy, and more.",
  },
  {
    icon: Download,
    title: "Easy Export",
    description: "Copy, download, or push directly to your e-commerce platform.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything You Need to
            <span className="text-primary"> Launch Products</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            One upload. Complete campaign. No more switching between tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
