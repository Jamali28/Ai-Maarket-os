export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    generations: 5,
    teamMembers: 1,
    contentTypes: 8,
    brandVoices: 1,
    analytics: false,
    apiAccess: false,
    support: "Email (72h)",
  },
  PRO: {
    name: "Pro",
    price: 29,
    generations: -1,
    teamMembers: 1,
    contentTypes: 16,
    brandVoices: 5,
    analytics: true,
    apiAccess: true,
    support: "Email (24h)",
    whopPlanId: process.env.WHOP_PRO_PLAN_ID,
  },
  BUSINESS: {
    name: "Business",
    price: 99,
    generations: -1,
    teamMembers: 5,
    contentTypes: 16,
    brandVoices: 10,
    analytics: true,
    apiAccess: true,
    support: "Priority Chat",
    whopPlanId: process.env.WHOP_BUSINESS_PLAN_ID,
  },
} as const;

export const GENERATION_TYPES = [
  { id: "DESCRIPTION", label: "Product Description", icon: "FileText" },
  { id: "BULLET_POINTS", label: "Bullet Points", icon: "List" },
  { id: "FEATURES", label: "Features", icon: "Sparkles" },
  { id: "BENEFITS", label: "Benefits", icon: "Heart" },
  { id: "SEO_TITLE", label: "SEO Title", icon: "Search" },
  { id: "META_DESCRIPTION", label: "Meta Description", icon: "AlignLeft" },
  { id: "KEYWORDS", label: "Keywords", icon: "Hash" },
  { id: "ALT_TEXT", label: "Alt Text", icon: "Image" },
  { id: "GOOGLE_ADS", label: "Google Ads", icon: "Megaphone" },
  { id: "FACEBOOK_ADS", label: "Facebook Ads", icon: "MessageSquare" },
  { id: "INSTAGRAM", label: "Instagram Captions", icon: "Camera" },
  { id: "TIKTOK", label: "TikTok Captions", icon: "Music" },
  { id: "PINTEREST", label: "Pinterest Posts", icon: "Bookmark" },
  { id: "MARKETING_EMAIL", label: "Marketing Email", icon: "Mail" },
  { id: "LAUNCH_EMAIL", label: "Launch Email", icon: "Rocket" },
  { id: "PROMOTIONAL_EMAIL", label: "Promotional Email", icon: "Percent" },
  { id: "SMS", label: "SMS Marketing", icon: "Smartphone" },
] as const;

export const TONE_VARIANTS = [
  { id: "PROFESSIONAL", label: "Professional", description: "Polished and authoritative" },
  { id: "CASUAL", label: "Casual", description: "Conversational and friendly" },
  { id: "LUXURY", label: "Luxury", description: "Premium and elegant" },
  { id: "PLAYFUL", label: "Playful", description: "Fun and energetic" },
  { id: "MINIMAL", label: "Minimal", description: "Short and direct" },
] as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Generator", href: "/generator", icon: "Wand2" },
  { label: "Templates", href: "/templates", icon: "FileText" },
  { label: "Analytics", href: "/analytics", icon: "BarChart3" },
  { label: "Billing", href: "/billing", icon: "CreditCard" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;
