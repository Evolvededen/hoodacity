import { supabase } from "./supabase";
import { Dashboard, Campaign, Agent, AgentTask } from "./types";

// Dashboard operations
export const dashboardService = {
  async getDashboard(department: string) {
    try {
      const { data, error } = await supabase
        .from("dashboards")
        .select("*")
        .eq("department", department)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
      return null;
    }
  },

  async saveDashboard(dashboard: Dashboard) {
    try {
      const { data, error } = await supabase
        .from("dashboards")
        .insert([dashboard])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Failed to save dashboard:", error);
      return null;
    }
  },
};

// Campaign operations
export const campaignService = {
  async getCampaigns() {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
      return [];
    }
  },

  async createCampaign(campaign: Campaign) {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .insert([campaign])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Failed to create campaign:", error);
      return null;
    }
  },
};

// Agent operations
export const agentService = {
  async getAgents() {
    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      return [];
    }
  },

  async getAgent(agentId: string) {
    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", agentId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Failed to fetch agent:", error);
      return null;
    }
  },

  async createAgent(agent: Agent) {
    try {
      const { data, error } = await supabase
        .from("agents")
        .insert([agent])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Failed to create agent:", error);
      return null;
    }
  },

  async updateAgent(agentId: string, updates: Partial<Agent>) {
    try {
      const { data, error } = await supabase
        .from("agents")
        .update(updates)
        .eq("id", agentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Failed to update agent:", error);
      return null;
    }
  },
};
