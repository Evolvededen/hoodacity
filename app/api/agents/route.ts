import { NextRequest, NextResponse } from "next/server";
import { mockAgents } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with Supabase query when connected
    // const { data, error } = await supabase.from("agents").select("*");

    return NextResponse.json(mockAgents);
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, taskData } = body;

    // Call Supabase Edge Function for agent orchestration
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/agent-orchestrator`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          agentType: type,
          payload: taskData,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Agent task error:", error);
    return NextResponse.json(
      { error: "Failed to execute agent task" },
      { status: 500 }
    );
  }
}
