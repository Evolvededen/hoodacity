import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      dashboards: {
        Row: {
          id: string;
          department: string;
          name: string;
          data: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["dashboards"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["dashboards"]["Row"]>;
      };
      campaigns: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: "draft" | "active" | "completed";
          data: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["campaigns"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Row"]>;
      };
      agents: {
        Row: {
          id: string;
          type: string;
          name: string;
          status: "idle" | "active" | "processing";
          config: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["agents"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["agents"]["Row"]>;
      };
    };
  };
};
