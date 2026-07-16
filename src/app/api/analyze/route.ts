import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/ai";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: "Image required" }, { status: 400 });
    }

    // Upload to Supabase temp bucket
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `temp/${Date.now()}-${imageFile.name}`;

    const { data: uploadData, error: uploadError } = await getSupabaseAdmin().storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: imageFile.type,
        cacheControl: "3600",
      });

    if (uploadError) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const { data: { publicUrl } } = getSupabaseAdmin().storage
      .from("products")
      .getPublicUrl(fileName);

    // Analyze with GPT-4o Vision
    const analysis = await analyzeImage(publicUrl);

    return NextResponse.json({
      productType: analysis.productType || "",
      materials: analysis.materials || [],
      colors: analysis.colors || [],
      style: analysis.style || "",
      useCases: analysis.useCases || [],
      audience: analysis.audience || "",
      category: analysis.category || "",
      features: analysis.features || "",
      keywords: analysis.keywords || "",
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Image analysis failed" },
      { status: 500 }
    );
  }
}
