// Example Supabase Edge Function for Agent Orchestration
// Deploy to: supabase/functions/agent-orchestrator

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AgentTask {
  agentType: "hr" | "intake" | "onboarding" | "frontdesk" | "campaign";
  payload: Record<string, unknown>;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { agentType, payload }: AgentTask = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get agent of specified type
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("*")
      .eq("type", agentType)
      .single();

    if (agentError) throw agentError;

    // Create task in queue
    const { data: task, error: taskError } = await supabase
      .from("agent_tasks")
      .insert([
        {
          agent_id: agent.id,
          type: payload.taskType || "general",
          status: "pending",
          input: payload,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (taskError) throw taskError;

    // Update agent status to processing
    await supabase.from("agents").update({ status: "processing" }).eq("id", agent.id);

    // Simulate task processing
    // In production, this would call the specific agent function
    const result = await processAgentTask(agentType, payload);

    // Update task with result
    await supabase
      .from("agent_tasks")
      .update({
        status: "completed",
        output: result,
        completed_at: new Date().toISOString(),
      })
      .eq("id", task.id);

    // Update agent status back to idle
    await supabase.from("agents").update({ status: "idle" }).eq("id", agent.id);

    return new Response(
      JSON.stringify({
        taskId: task.id,
        agentId: agent.id,
        status: "completed",
        result,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

async function processAgentTask(
  agentType: string,
  payload: Record<string, unknown>
): Promise<Record<string, unknown>> {
  // Agent-specific processing logic
  switch (agentType) {
    case "hr":
      return { status: "processed", type: "hr", data: payload };
    case "intake":
      return { status: "processed", type: "intake", data: payload };
    case "onboarding":
      return { status: "processed", type: "onboarding", data: payload };
    case "frontdesk":
      return { status: "processed", type: "frontdesk", data: payload };
    case "campaign":
      return { status: "processed", type: "campaign", data: payload };
    default:
      return { status: "unknown_agent_type" };
  }
}
