import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;
    const dataStr = formData.get("data") as string | null;

    if (!imageFile || !dataStr) {
      return NextResponse.json({ error: "Image and data required" }, { status: 400 });
    }

    const data = JSON.parse(dataStr);
    const userId = "temp-user-id"; // Replace with actual auth

    // Upload image to Supabase Storage
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `products/${userId}/${Date.now()}-${imageFile.name}`;

    const { data: uploadData, error: uploadError } = await getSupabaseAdmin().storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: imageFile.type,
        cacheControl: "3600",
      });

    if (uploadError) {
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }

    const { data: { publicUrl } } = getSupabaseAdmin().storage
      .from("products")
      .getPublicUrl(fileName);

    // Create or use default project
    let project = await prisma.project.findFirst({
      where: { userId, deletedAt: null },
    });

    if (!project) {
      project = await prisma.project.create({
        data: { userId, name: "Default Project" },
      });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        projectId: project.id,
        userId,
        name: data.name,
        category: data.category || null,
        brand: data.brand || null,
        features: data.features || null,
        targetAudience: data.targetAudience || null,
        keywords: data.keywords || null,
        imagePath: publicUrl,
        imageAnalysis: data.imageAnalysis || undefined,
      },
    });

    return NextResponse.json({ productId: product.id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
