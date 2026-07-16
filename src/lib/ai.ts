import { GoogleGenerativeAI } from "@google/generative-ai";

let _genAI: GoogleGenerativeAI | null = null;

export function getGemini(): GoogleGenerativeAI {
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  return _genAI!;
}

export async function analyzeImage(imageUrl: string) {
  const genAI = getGemini();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const mimeType = response.headers.get("content-type") || "image/jpeg";

  const result = await model.generateContent([
    {
      text: `Analyze this product image and return a JSON object with:
- productType: what type of product this is
- materials: array of detected materials
- colors: array of dominant colors (hex codes)
- style: style descriptors (e.g. "modern", "vintage", "minimalist")
- useCases: array of possible use cases
- audience: the likely target audience
- category: the product category

Return ONLY valid JSON, no markdown formatting.`,
    },
    {
      inlineData: { mimeType, data: base64 },
    },
  ]);

  const content = result.response.text();
  return JSON.parse(content.replace(/```json|```/g, "").trim());
}

export function buildPrompt(
  type: string,
  product: {
    name: string;
    category?: string | null;
    description?: string | null;
    features?: string | null;
    brand?: string | null;
    targetAudience?: string | null;
    keywords?: string | null;
    imageAnalysis?: unknown;
  },
  tone: string,
  customInstructions?: string
): { systemInstruction: string; userPrompt: string } {
  const analysis = product.imageAnalysis
    ? `\nImage Analysis: ${JSON.stringify(product.imageAnalysis)}`
    : "";
  const audience = product.targetAudience
    ? `\nTarget Audience: ${product.targetAudience}`
    : "";
  const keywords = product.keywords
    ? `\nKeywords to include: ${product.keywords}`
    : "";

  const toneGuide = {
    PROFESSIONAL:
      "Use a polished, authoritative tone. Write confidently with industry-specific language. Be persuasive but not pushy.",
    CASUAL:
      "Use a conversational, friendly tone. Write like a helpful friend. Be approachable and relatable.",
    LUXURY:
      "Use an elegant, premium tone. Sophisticated vocabulary. Emphasize exclusivity and quality.",
    PLAYFUL:
      "Use an energetic, fun tone. Be creative with wordplay. Add personality and humor.",
    MINIMAL:
      "Use a short, direct tone. Get straight to the point. No fluff or extra words.",
  }[tone] || "Use a professional, clear tone.";

  const base = `Product: ${product.name}
Category: ${product.category || "General"}
Brand: ${product.brand || "Not specified"}${analysis}${audience}${keywords}
Tone: ${toneGuide}
${customInstructions ? `\nAdditional Instructions: ${customInstructions}` : ""}`;

  const prompts: Record<string, string> = {
    DESCRIPTION: `${base}\n\nWrite a compelling product description (150-250 words). Include features, benefits, and a call to action. Optimize for conversions.`,
    BULLET_POINTS: `${base}\n\nWrite 5-7 compelling bullet points highlighting key features and benefits. Each bullet should be 10-20 words. Start with the most compelling point.`,
    FEATURES: `${base}\n\nList 5-8 key product features. Each feature should be 5-15 words. Focus on what the product HAS or DOES.`,
    BENEFITS: `${base}\n\nList 5-8 key benefits. Each benefit should explain how the feature improves the customer's life. Format: "Benefit: explanation" (10-20 words each).`,
    SEO_TITLE: `${base}\n\nWrite an SEO-optimized product title (max 60 characters). Include primary keyword. Make it compelling for search clicks.`,
    META_DESCRIPTION: `${base}\n\nWrite an SEO meta description (max 160 characters). Include primary keyword and value proposition. Make it compelling for search clicks.`,
    KEYWORDS: `${base}\n\nGenerate 15-20 relevant keywords and phrases. Include short-tail and long-tail keywords. Return as comma-separated list.`,
    ALT_TEXT: `${base}\n\nWrite 3 alt text options for the product image (max 125 characters each). Be descriptive and include relevant keywords for SEO.`,
    GOOGLE_ADS: `${base}\n\nWrite a Google Ads copy with:\n- Headline 1 (30 chars max)\n- Headline 2 (30 chars max)\n- Headline 3 (30 chars max)\n- Description 1 (90 chars max)\n- Description 2 (90 chars max)\nInclude a clear value proposition and call to action.`,
    FACEBOOK_ADS: `${base}\n\nWrite a Facebook ad copy:\n- Primary Text (125 chars max)\n- Headline (40 chars max)\n- Description (30 chars max)\n- Call to Action button text\nMake it scroll-stopping and benefit-driven.`,
    INSTAGRAM: `${base}\n\nWrite 3 Instagram caption options (150-220 chars each). Include relevant hashtags (5-10). Use an engaging hook. Add emojis naturally.`,
    TIKTOK: `${base}\n\nWrite 3 TikTok caption options (100-150 chars each). Include trending hashtags (3-5). Write hooks that stop the scroll. Short, punchy, engaging.`,
    PINTEREST: `${base}\n\nWrite 3 Pinterest pin descriptions (200-300 chars each). Include keywords naturally. Add 5-10 relevant hashtags. Focus on inspiration and ideas.`,
    MARKETING_EMAIL: `${base}\n\nWrite a marketing email:\n- Subject Line (50-60 chars)\n- Preview Text (100 chars max)\n- Email Body (200-300 words)\nInclude personalization, benefits, social proof, and clear CTA. Structure with short paragraphs.`,
    LAUNCH_EMAIL: `${base}\n\nWrite a product launch email:\n- Subject Line (50-60 chars)\n- Preview Text (100 chars max)\n- Email Body (200-300 words)\nCreate urgency and excitement. Include launch date/availability, key benefits, and strong CTA.`,
    PROMOTIONAL_EMAIL: `${base}\n\nWrite a promotional/discount email:\n- Subject Line (50-60 chars)\n- Preview Text (100 chars max)\n- Email Body (150-250 words)\nInclude the offer clearly, scarcity elements, benefits, and urgent CTA.`,
    SMS: `${base}\n\nWrite 3 SMS marketing messages (160 chars max each). Each must be complete and include a CTA. Use short links placeholder [link]. Concise and urgent.`,
  };

  const userPrompt = prompts[type] || base;

  return {
    systemInstruction:
      "You are a professional e-commerce marketing copywriter. Generate high-quality, conversion-optimized marketing content. Return only the requested content without explanations.",
    userPrompt,
  };
}
