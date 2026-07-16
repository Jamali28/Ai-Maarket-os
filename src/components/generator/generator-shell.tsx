"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductUpload } from "./product-upload";
import { GenerationCard } from "./generation-card";
import { useStreamingText } from "@/hooks/use-streaming-text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GenerationType, ToneVariant } from "@/types";
import { GENERATION_TYPES, TONE_VARIANTS } from "@/lib/constants";
import { Sparkles, Download, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function GeneratorShell() {
  const [productId, setProductId] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<GenerationType[]>(
    GENERATION_TYPES.slice(0, 8).map((t) => t.id as GenerationType)
  );
  const [variant, setVariant] = useState<ToneVariant>("PROFESSIONAL");
  const { contents, isStreaming, completed, errors, startStream, cancelStream, reset } =
    useStreamingText();

  const handleProductCreated = (id: string) => {
    setProductId(id);
    // Auto-start generation
    startStream(id, selectedTypes, variant);
  };

  const handleRegenerateType = (type: GenerationType) => {
    if (productId) {
      startStream(productId, [type], variant);
    }
  };

  const toggleType = (type: GenerationType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleExport = () => {
    toast.success("Exporting all content...");
  };

  if (!productId) {
    return <ProductUpload onProductCreated={handleProductCreated} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setProductId(null);
              reset();
            }}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xl font-semibold">Generated Content</h2>
            <p className="text-sm text-muted-foreground">
              {isStreaming ? "AI is generating your content..." : `${completed.length} of ${selectedTypes.length} types generated`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isStreaming ? (
            <Button variant="outline" size="sm" onClick={cancelStream}>
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              Stop
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => productId && startStream(productId, selectedTypes, variant)}
                disabled={selectedTypes.length === 0}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Regenerate
              </Button>
              <Button size="sm" onClick={handleExport}>
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tone Variant Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium mr-1">Voice:</span>
        {TONE_VARIANTS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setVariant(t.id as ToneVariant);
              if (productId) {
                reset();
                startStream(productId, selectedTypes, t.id as ToneVariant);
              }
            }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
              variant === t.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/30 text-muted-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Type Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs text-muted-foreground font-medium mr-1 self-center">
          Types:
        </span>
        {GENERATION_TYPES.map((type) => {
          const isSelected = selectedTypes.includes(type.id as GenerationType);
          const isCompleted = completed.includes(type.id as GenerationType);
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id as GenerationType)}
              disabled={isStreaming}
              className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all border",
                isSelected
                  ? isCompleted
                    ? "border-success/30 bg-success/5 text-success"
                    : "border-primary/30 bg-primary/5 text-primary"
                  : "border-border/50 text-muted-foreground hover:border-border"
              )}
            >
              {type.label}
              {isCompleted && <CheckCircle className="h-2.5 w-2.5 inline ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Generation Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {selectedTypes.map((type) => (
          <GenerationCard
            key={type}
            type={type}
            content={contents[type] || ""}
            isStreaming={isStreaming && !completed.includes(type)}
            isCompleted={completed.includes(type)}
            onRegenerate={() => handleRegenerateType(type)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isStreaming && (
        <div className="sticky bottom-4 rounded-xl border border-primary/20 bg-card/95 backdrop-blur-sm p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm font-medium">Generating content</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {completed.length} / {selectedTypes.length}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{
                width: `${(completed.length / selectedTypes.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive mb-1">Errors</p>
          {errors.map((err, i) => (
            <p key={i} className="text-xs text-muted-foreground">{err}</p>
          ))}
        </div>
      )}
    </div>
  );
}
