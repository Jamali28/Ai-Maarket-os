"use client";

import { motion } from "framer-motion";

const logos = [
  "Shopify",
  "WooCommerce",
  "Amazon",
  "Etsy",
  "BigCommerce",
  "Squarespace",
];

export function TrustedBy() {
  return (
    <section className="py-16 border-y border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by sellers on every major platform
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-lg sm:text-xl font-semibold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
