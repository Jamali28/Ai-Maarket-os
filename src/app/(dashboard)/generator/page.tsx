"use client";

import { motion } from "framer-motion";
import { GeneratorShell } from "@/components/generator/generator-shell";

export default function GeneratorPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Marketing Generator
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload a product and generate complete marketing content in seconds.
        </p>
      </motion.div>
      <GeneratorShell />
    </div>
  );
}
