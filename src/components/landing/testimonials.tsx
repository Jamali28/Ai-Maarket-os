"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "AI Marketing OS cut our product launch time from 3 days to 20 minutes. The quality is incredible — our conversion rate actually improved.",
    author: "Sarah Chen",
    role: "Shopify Store Owner",
    platform: "Shopify",
  },
  {
    quote:
      "I was spending $800/month on a copywriter. This replaced that expense entirely. The SMS and email campaigns alone are worth it.",
    author: "Marcus Johnson",
    role: "Amazon FBA Seller",
    platform: "Amazon",
  },
  {
    quote:
      "The image analysis is mind-blowing. It detects materials, colors, and style — then writes Instagram captions that sound like me.",
    author: "Priya Patel",
    role: "Etsy Maker",
    platform: "Etsy",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Loved by Online Sellers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of merchants using AI Marketing OS to launch products faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-xl border border-border/50 bg-card p-8"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  {testimonial.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
                <span className="ml-auto text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {testimonial.platform}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
