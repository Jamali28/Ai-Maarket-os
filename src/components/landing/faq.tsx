"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does AI Marketing OS work?",
    a: "Upload a product image and basic info. Our AI analyzes the image, detects style and materials, then generates optimized marketing content across every channel — descriptions, ads, emails, SEO, and social posts.",
  },
  {
    q: "Is the AI content original?",
    a: "Yes. Every piece of content is generated uniquely for your product based on your brand voice, target audience, and product details. We don't reuse templates.",
  },
  {
    q: "Can I edit the generated content?",
    a: "Absolutely. Every generation is fully editable inline. You can also switch brand voices with one click to regenerate all content in a different tone.",
  },
  {
    q: "Which e-commerce platforms do you support?",
    a: "We support Shopify (direct push), WooCommerce, Amazon, and Etsy. More platforms coming soon.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes! Free plan includes 5 generations per month with 8 content types. No credit card required.",
  },
  {
    q: "How is content quality ensured?",
    a: "Our prompts are crafted by e-commerce marketing experts and optimized for each platform. We use the latest GPT models and continuously iterate on prompt quality.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-medium text-sm">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
