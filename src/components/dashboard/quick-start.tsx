"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ArrowRight, Sparkles } from "lucide-react";

export function QuickStart() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
      <CardContent className="p-6 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Quick Generate</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Upload a product and generate a complete marketing campaign in seconds.
            </p>
          </div>
          <Link href="/generator">
            <Button className="gap-2 shadow-lg shadow-indigo-500/25 shrink-0">
              <Upload className="h-4 w-4" />
              Upload Product
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
