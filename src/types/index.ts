export type PlanType = "FREE" | "PRO" | "BUSINESS";
export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING";
export type GenerationStatus = "PENDING" | "STREAMING" | "COMPLETED" | "FAILED";
export type ToneVariant = "PROFESSIONAL" | "CASUAL" | "LUXURY" | "PLAYFUL" | "MINIMAL";

export type GenerationType =
  | "DESCRIPTION"
  | "BULLET_POINTS"
  | "FEATURES"
  | "BENEFITS"
  | "SEO_TITLE"
  | "META_DESCRIPTION"
  | "KEYWORDS"
  | "ALT_TEXT"
  | "GOOGLE_ADS"
  | "FACEBOOK_ADS"
  | "INSTAGRAM"
  | "TIKTOK"
  | "PINTEREST"
  | "MARKETING_EMAIL"
  | "LAUNCH_EMAIL"
  | "PROMOTIONAL_EMAIL"
  | "SMS";

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  planType: PlanType;
  status: SubscriptionStatus;
  generationsLimit: number;
  generationsUsed: number;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  brandVoice: BrandVoice | null;
  settings: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: { products: number };
}

export interface Product {
  id: string;
  projectId: string;
  userId: string;
  name: string;
  category: string | null;
  description: string | null;
  brand: string | null;
  features: string | null;
  targetAudience: string | null;
  keywords: string | null;
  imagePath: string | null;
  imageAnalysis: ImageAnalysis | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: { generations: number };
}

export interface Generation {
  id: string;
  productId: string;
  userId: string;
  projectId: string;
  type: GenerationType;
  variant: ToneVariant;
  content: string | null;
  tokensUsed: number;
  modelUsed: string | null;
  latencyMs: number;
  status: GenerationStatus;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

export interface ImageAnalysis {
  productType?: string;
  materials?: string[];
  colors?: string[];
  style?: string;
  useCases?: string[];
  audience?: string;
  category?: string;
}

export interface BrandVoice {
  tone: string;
  style: string;
  audience: string;
  keywords: string[];
  guidelines?: string;
}

export interface GenerationStreamEvent {
  type: GenerationType;
  token?: string;
  done?: boolean;
  error?: string;
  generationId?: string;
  tokensUsed?: number;
}

export interface UsageStats {
  totalGenerations: number;
  generationsThisMonth: number;
  limit: number;
  byType: Record<string, number>;
  dailyUsage: { date: string; count: number }[];
}

export interface AnalyticsData {
  totalGenerations: number;
  totalProducts: number;
  totalProjects: number;
  topTypes: { type: string; count: number }[];
  usageTrend: { date: string; count: number }[];
  byDay: { date: string; count: number }[];
}
