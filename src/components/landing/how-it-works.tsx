"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, FileText, Share2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Product",
    description: "Add a product image, name, and category. Our AI instantly analyzes the image to detect style, materials, and audience.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Wand2,
    title: "AI Analyzes & Generates",
    description: "Our engine creates optimized content for every channel — descriptions, ads, emails, SEO, and social posts.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: FileText,
    title: "Review & Edit",
    description: "Fine-tune any piece of content inline. Switch brand voices with one click. Everything is editable.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Share2,
    title: "Export & Publish",
    description: "Copy, download as CSV, or push directly to Shopify. Your campaign goes live in minutes.",
    color: "from-pink-500 to-rose-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            From Product to Campaign in
            <span className="text-primary"> 60 Seconds</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to a complete marketing launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-border/0" />
              )}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6`}
                >
                  <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-foreground" />
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
