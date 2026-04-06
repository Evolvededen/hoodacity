import { NextRequest, NextResponse } from "next/server";
import { generateCampaign, generateContent, generateAds } from "@/lib/generators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, inputs } = body;

    let result;

    switch (type) {
      case "campaigns":
        result = await generateCampaign({ type: "campaign", title, inputs });
        break;
      case "content":
        result = await generateContent({ type: "content", title, inputs });
        break;
      case "ads":
        result = await generateAds({ type: "ad", title, inputs });
        break;
      default:
        return NextResponse.json(
          { error: "Invalid generator type" },
          { status: 400 }
        );
    }

    // Save to Supabase (when connected)
    // await campaignService.createCampaign(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
