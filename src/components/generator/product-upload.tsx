"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  Image,
  X,
  Sparkles,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  description: string;
  features: string;
  targetAudience: string;
  keywords: string;
}

interface ProductUploadProps {
  onProductCreated: (productId: string) => void;
}

export function ProductUpload({ onProductCreated }: ProductUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    category: "",
    brand: "",
    description: "",
    features: "",
    targetAudience: "",
    keywords: "",
  });
  const [tone, setTone] = useState("PROFESSIONAL");
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      analyzeImage(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const analyzeImage = async (file: File) => {
    setAnalyzing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setForm((prev) => ({
        ...prev,
        category: data.category || prev.category,
        features: data.features || prev.features,
        targetAudience: data.audience || prev.targetAudience,
        keywords: data.keywords || prev.keywords,
      }));
    } catch {
      setError("Image analysis failed. You can fill in the details manually.");
    } finally {
      setAnalyzing(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (preview) URL.revokeObjectURL(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !form.name) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("data", JSON.stringify({ ...form, tone }));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { productId } = await res.json();
      onProductCreated(productId);
    } catch {
      setError("Failed to create product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const tones = [
    { id: "PROFESSIONAL", label: "Pro" },
    { id: "CASUAL", label: "Casual" },
    { id: "LUXURY", label: "Luxury" },
    { id: "PLAYFUL", label: "Playful" },
    { id: "MINIMAL", label: "Minimal" },
  ];

  return (
    <Card className="border-border/50">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <AnimatePresence mode="wait">
              {!preview ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    {...getRootProps()}
                    className={cn(
                      "relative rounded-xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-200",
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {isDragActive ? "Drop image here" : "Drag & drop product image"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG or WebP up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative rounded-xl overflow-hidden border border-border"
                >
                  <img
                    src={preview}
                    alt="Product preview"
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {analyzing && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      AI analyzing image...
                    </div>
                  )}
                  {!analyzing && preview && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-success/80 text-white text-xs px-3 py-1.5 rounded-full">
                      <Check className="h-3 w-3" />
                      Image analyzed
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Product Name *"
              placeholder="e.g. Premium Leather Backpack"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Category"
              placeholder="e.g. Accessories"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <Input
              label="Brand"
              placeholder="e.g. Artisan Co."
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
            <Input
              label="Target Audience"
              placeholder="e.g. Fashion-conscious professionals"
              value={form.targetAudience}
              onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Key Features"
              placeholder="e.g. Waterproof, 15L capacity, Laptop compartment"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
            />
            <Input
              label="Keywords (comma separated)"
              placeholder="e.g. leather backpack, premium bag, travel backpack"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-sm font-medium mb-3">Brand Voice</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                    tone === t.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={!image || !form.name || uploading}
            loading={uploading}
          >
            <Sparkles className="h-4 w-4" />
            {uploading ? "Creating Product..." : "Generate All Content"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
