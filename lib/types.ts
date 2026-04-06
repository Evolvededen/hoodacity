export type Department = "hr" | "intake" | "onboarding" | "frontdesk";

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  data: Record<string, unknown>;
}

export interface Dashboard {
  id: string;
  department: Department;
  name: string;
  widgets: DashboardWidget[];
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  content: string;
  audience?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  type: Department | "campaign";
  name: string;
  status: "idle" | "active" | "processing";
  config: Record<string, unknown>;
  taskQueue: AgentTask[];
  createdAt: string;
  updatedAt: string;
}

export interface AgentTask {
  id: string;
  agentId: string;
  type: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

export interface GeneratedContent {
  id: string;
  type: "campaign" | "content" | "ad";
  title: string;
  content: string;
  preview?: string;
  status: "draft" | "saved";
  createdAt: string;
}

export interface AdData {
  title: string;
  description: string;
  imageUrl?: string;
  cta: string;
  demographics?: {
    ageRange?: string;
    location?: string;
    interests?: string[];
  };
}
