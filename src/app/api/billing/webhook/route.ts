import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@/lib/whop";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const payload = verifyWebhook(body, req.headers);

    if (!payload) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const { type, data } = payload;

    switch (type) {
      case "membership.activated": {
        const membershipId = data.id as string;
        const userId = (data.metadata as Record<string, string>)?.userId;
        const planId = (data.plan as Record<string, unknown>)?.id as string;

        if (!userId) break;

        const planType =
          planId === process.env.WHOP_BUSINESS_PLAN_ID ? "BUSINESS" : "PRO";

        const existing = await prisma.subscription.findUnique({
          where: { userId },
        });

        if (existing) {
          await prisma.subscription.update({
            where: { userId },
            data: {
              planType: planType as any,
              status: "ACTIVE",
              generationsLimit: planType === "BUSINESS" ? -1 : 100,
            },
          });
        } else {
          await prisma.subscription.create({
            data: {
              userId,
              planType: planType as any,
              status: "ACTIVE",
              generationsLimit: planType === "BUSINESS" ? -1 : 100,
              stripeCustomerId: membershipId,
            },
          });
        }
        break;
      }

      case "membership.deactivated": {
        const deactivatedId = data.id as string;
        const sub = await prisma.subscription.findFirst({
          where: { stripeCustomerId: deactivatedId },
        });

        if (sub) {
          await prisma.subscription.update({
            where: { id: sub.id },
            data: {
              status: "CANCELED",
              planType: "FREE",
              generationsLimit: 5,
            },
          });
        }
        break;
      }

      case "payment.failed": {
        const failedMembershipId = (data.membership as Record<string, unknown>)?.id as string;
        const failedSub = await prisma.subscription.findFirst({
          where: { stripeCustomerId: failedMembershipId },
        });

        if (failedSub) {
          await prisma.subscription.update({
            where: { id: failedSub.id },
            data: { status: "PAST_DUE" },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}
