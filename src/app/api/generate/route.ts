import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildPrompt, getGemini } from "@/lib/ai";
import { checkUsageLimit, checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { productId, types, variant } = await req.json();
    const userId = "temp-user-id"; // Replace with actual auth

    if (!productId || !types || !variant) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Rate limit check
    const rateCheck = checkRateLimit(`gen:${userId}`, 10);
    if (!rateCheck.allowed) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Usage check
    const usage = await prisma.generation.count({
      where: { userId, createdAt: { gte: new Date(new Date().setDate(1)) } },
    });
    const usageCheck = checkUsageLimit(usage, 100);
    if (!usageCheck.allowed) {
      return new Response(JSON.stringify({ error: "Usage limit reached" }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for (const type of types) {
            const prompt = buildPrompt(type, product, variant);

            // Send start event
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type, token: "" })}\n\n`)
            );

            const startTime = Date.now();
            let fullContent = "";

            try {
              const genAI = getGemini();
              const { systemInstruction, userPrompt } = prompt;
              const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
                systemInstruction,
              });

              const result = await model.generateContentStream(userPrompt);

              for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                  fullContent += text;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type, token: text })}\n\n`
                    )
                  );
                }
              }

              const latencyMs = Date.now() - startTime;
              const tokensUsed = fullContent.split(" ").length + userPrompt.split(" ").length;

              // Save to database
              await prisma.generation.create({
                data: {
                  productId,
                  userId,
                  projectId: product.projectId,
                  type: type as any,
                  variant: variant as any,
                  content: fullContent,
                  tokensUsed,
                  modelUsed: "gemini-2.0-flash",
                  latencyMs,
                  status: "COMPLETED",
                },
              });

              // Send done event
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type, done: true, tokensUsed })}\n\n`
                )
              );
            } catch (error) {
              console.error(`Generation error for ${type}:`, error);
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type, error: `Failed to generate ${type}` })}\n\n`
                )
              );
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Generation failed" })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    return new Response(JSON.stringify({ error: "Generation failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
