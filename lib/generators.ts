import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export interface GenerationRequest {
  type: "campaign" | "content" | "ad";
  title: string;
  inputs: Record<string, string>;
}

export interface GeneratedResult {
  id: string;
  type: "campaign" | "content" | "ad";
  title: string;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export async function generateCampaign(request: GenerationRequest): Promise<GeneratedResult> {
  const prompt = `
Create a comprehensive marketing campaign with the following details:
Title: ${request.inputs["Campaign Name"]}
Target Audience: ${request.inputs["Target Audience"]}
Theme: ${request.inputs["Campaign Theme"]}
Duration: ${request.inputs["Duration"]}
Budget: ${request.inputs["Budget"]}

Please provide:
1. Campaign Overview
2. Marketing Channels
3. Key Messages
4. Timeline
5. Success Metrics
`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
  });

  return {
    id: `campaign-${Date.now()}`,
    type: "campaign",
    title: request.inputs["Campaign Name"],
    content: text,
    metadata: request.inputs,
    createdAt: new Date().toISOString(),
  };
}

export async function generateContent(request: GenerationRequest): Promise<GeneratedResult> {
  const prompt = `
Generate marketing content with the following specifications:
Title: ${request.inputs["Content Title"]}
Topic: ${request.inputs["Topic"]}
Tone: ${request.inputs["Tone"]}
Length: ${request.inputs["Length"]}
Platform: ${request.inputs["Target Platform"]}

Please create engaging, original content optimized for the specified platform and tone. Include:
1. Headline
2. Main Body
3. Call-to-Action
4. Hashtags/Keywords (if applicable)
`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
  });

  return {
    id: `content-${Date.now()}`,
    type: "content",
    title: request.inputs["Content Title"],
    content: text,
    metadata: request.inputs,
    createdAt: new Date().toISOString(),
  };
}

export async function generateAds(request: GenerationRequest): Promise<GeneratedResult> {
  const prompt = `
Create targeted advertisements with the following specifications:
Ad Title: ${request.inputs["Ad Title"]}
Target Demographics: ${request.inputs["Target Demographics"]}
Call-to-Action: ${request.inputs["Call-to-Action"]}
Ad Copy Length: Short (max 280 characters)
Style/Theme: ${request.inputs["Style/Theme"]}

Please generate:
1. Main Ad Copy (under 280 characters)
2. Alternative Headlines (3 options)
3. Design Recommendations
4. Audience Targeting Tips
5. Expected CTR Estimate
`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
  });

  return {
    id: `ad-${Date.now()}`,
    type: "ad",
    title: request.inputs["Ad Title"],
    content: text,
    metadata: request.inputs,
    createdAt: new Date().toISOString(),
  };
}
