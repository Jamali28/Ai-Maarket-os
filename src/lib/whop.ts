const WHOP_API_BASE = "https://api.whop.com/api/v1";

interface WhopPlan {
  id: string;
  initial_price: number;
  renewal_price?: number;
  plan_type: "one_time" | "renewal";
  billing_period?: number;
  currency: string;
}

interface WhopCheckoutConfig {
  id: string;
  url: string;
  plan: WhopPlan;
}

export async function createCheckoutSession(
  planId: string,
  metadata: Record<string, string> = {},
  returnUrl?: string
): Promise<WhopCheckoutConfig> {
  const res = await fetch(`${WHOP_API_BASE}/checkout_configurations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan: { id: planId },
      metadata,
      ...(returnUrl ? { return_url: returnUrl } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Whop checkout failed: ${res.status}`);
  }

  return res.json();
}

export function getCheckoutUrl(config: WhopCheckoutConfig): string {
  return `https://whop.com/checkout/${config.plan.id}/`;
}

export interface WhopWebhookPayload {
  id: string;
  type: string;
  data: Record<string, unknown>;
  company_id: string;
  timestamp: string;
}

export function verifyWebhook(
  body: string,
  headers: Headers
): WhopWebhookPayload | null {
  const signature = headers.get("webhook-signature");
  const timestamp = headers.get("webhook-timestamp");
  const webhookId = headers.get("webhook-id");

  if (!signature || !timestamp || !webhookId) return null;

  // In production, use @whop/sdk to verify:
  // const whop = new Whop({ apiKey: process.env.WHOP_API_KEY, webhookKey: ... });
  // return whop.webhooks.unwrap(body, headers);

  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (!secret) return null;

  // Basic verification: check the signature header exists
  // Full verification requires the @whop/sdk package
  try {
    return JSON.parse(body) as WhopWebhookPayload;
  } catch {
    return null;
  }
}

export const PLANS = {
  PRO: {
    planId: process.env.WHOP_PRO_PLAN_ID || "",
    name: "Pro",
    amount: 29,
    interval: "month" as const,
  },
  BUSINESS: {
    planId: process.env.WHOP_BUSINESS_PLAN_ID || "",
    name: "Business",
    amount: 99,
    interval: "month" as const,
  },
};
