"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  FileText,
  Search,
  Hash,
  Image as ImageIcon,
  Heart,
  List,
  Mail,
  MessageSquare,
  Camera,
  Music,
  Bookmark,
  Smartphone,
  Percent,
  Rocket,
  Megaphone,
  AlignLeft,
} from "lucide-react";
import type { GenerationType } from "@/types";
import { toast } from "sonner";

interface GenerationCardProps {
  type: GenerationType;
  content: string;
  isStreaming: boolean;
  isCompleted: boolean;
  onRegenerate?: () => void;
}

const typeConfig: Record<GenerationType, { label: string; icon: React.ElementType; color: string }> = {
  DESCRIPTION: { label: "Product Description", icon: FileText, color: "text-indigo-500" },
  BULLET_POINTS: { label: "Bullet Points", icon: List, color: "text-emerald-500" },
  FEATURES: { label: "Features", icon: Sparkles, color: "text-amber-500" },
  BENEFITS: { label: "Benefits", icon: Heart, color: "text-rose-500" },
  SEO_TITLE: { label: "SEO Title", icon: Search, color: "text-blue-500" },
  META_DESCRIPTION: { label: "Meta Description", icon: AlignLeft, color: "text-cyan-500" },
  KEYWORDS: { label: "Keywords", icon: Hash, color: "text-violet-500" },
  ALT_TEXT: { label: "Alt Text", icon: ImageIcon, color: "text-teal-500" },
  GOOGLE_ADS: { label: "Google Ads", icon: Megaphone, color: "text-orange-500" },
  FACEBOOK_ADS: { label: "Facebook Ads", icon: MessageSquare, color: "text-sky-500" },
  INSTAGRAM: { label: "Instagram Captions", icon: Camera, color: "text-pink-500" },
  TIKTOK: { label: "TikTok Captions", icon: Music, color: "text-fuchsia-500" },
  PINTEREST: { label: "Pinterest Posts", icon: Bookmark, color: "text-red-500" },
  MARKETING_EMAIL: { label: "Marketing Email", icon: Mail, color: "text-indigo-500" },
  LAUNCH_EMAIL: { label: "Launch Email", icon: Rocket, color: "text-purple-500" },
  PROMOTIONAL_EMAIL: { label: "Promotional Email", icon: Percent, color: "text-green-500" },
  SMS: { label: "SMS Marketing", icon: Smartphone, color: "text-yellow-500" },
};

export function GenerationCard({ type, content, isStreaming, isCompleted, onRegenerate }: GenerationCardProps) {
  const [copied, setCopied] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl border transition-all duration-300",
        isStreaming ? "border-primary/30 bg-primary/5" : "border-border/50 bg-card",
        isCompleted && "hover:border-border"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className={cn("h-8 w-8 rounded-lg bg-muted flex items-center justify-center", config.color)}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-medium">{config.label}</h3>
            {isStreaming && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-primary">Generating...</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isCompleted && (
            <>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                title="Copy"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="p-4">
        {content ? (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
            {isStreaming && (
              <span className="inline-block h-4 w-0.5 bg-primary ml-0.5 animate-pulse" />
            )}
          </div>
        ) : isStreaming ? (
          <div className="space-y-2">
            <div className="h-3 rounded bg-primary/10 shimmer w-full" />
            <div className="h-3 rounded bg-primary/10 shimmer w-3/4" />
            <div className="h-3 rounded bg-primary/10 shimmer w-1/2" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Icon className="h-8 w-8 mb-2 opacity-30" />
            <p className="text-sm">Click "Generate All" to create content</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
