import { Dashboard, Agent, Campaign } from "./types";

export const mockDashboards: Record<string, Dashboard> = {
  hr: {
    id: "dash-hr-1",
    department: "hr",
    name: "HR Dashboard",
    widgets: [
      {
        id: "widget-1",
        type: "employee-count",
        title: "Total Employees",
        data: { count: 245, trend: "+8%" },
      },
      {
        id: "widget-2",
        type: "recruitment",
        title: "Open Positions",
        data: { open: 12, inProgress: 5 },
      },
      {
        id: "widget-3",
        type: "leave-requests",
        title: "Pending Leave Requests",
        data: { pending: 8, approved: 24 },
      },
      {
        id: "widget-4",
        type: "payroll",
        title: "Payroll Status",
        data: { processed: 89, pending: 3 },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  intake: {
    id: "dash-intake-1",
    department: "intake",
    name: "Intake Dashboard",
    widgets: [
      {
        id: "widget-5",
        type: "applications",
        title: "New Applications",
        data: { today: 12, thisWeek: 67, pending: 23 },
      },
      {
        id: "widget-6",
        type: "processing",
        title: "Applications in Process",
        data: { approved: 18, rejected: 3, pending: 5 },
      },
      {
        id: "widget-7",
        type: "timeline",
        title: "Average Processing Time",
        data: { days: 3.2, target: 2 },
      },
      {
        id: "widget-8",
        type: "documents",
        title: "Documents Pending",
        data: { count: 42, verified: 89 },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  onboarding: {
    id: "dash-onboarding-1",
    department: "onboarding",
    name: "Onboarding Dashboard",
    widgets: [
      {
        id: "widget-9",
        type: "cohort-progress",
        title: "Current Cohort Progress",
        data: { completed: 18, inProgress: 12, notStarted: 5 },
      },
      {
        id: "widget-10",
        type: "completion-rate",
        title: "Completion Rate",
        data: { percentage: 78, trend: "+5%" },
      },
      {
        id: "widget-11",
        type: "schedule",
        title: "Upcoming Sessions",
        data: { today: 2, thisWeek: 8, nextWeek: 12 },
      },
      {
        id: "widget-12",
        type: "training-modules",
        title: "Active Training Modules",
        data: { total: 24, completed: 8, inProgress: 16 },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  frontdesk: {
    id: "dash-frontdesk-1",
    department: "frontdesk",
    name: "Front Desk Dashboard",
    widgets: [
      {
        id: "widget-13",
        type: "visitors",
        title: "Daily Visitors",
        data: { today: 34, average: 28 },
      },
      {
        id: "widget-14",
        type: "appointments",
        title: "Today's Appointments",
        data: { confirmed: 12, pending: 3, cancelled: 1 },
      },
      {
        id: "widget-15",
        type: "queue",
        title: "Current Queue",
        data: { waiting: 5, inService: 2 },
      },
      {
        id: "widget-16",
        type: "messages",
        title: "Messages",
        data: { unread: 7, responded: 156 },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const mockAgents: Agent[] = [
  {
    id: "agent-hr-1",
    type: "hr",
    name: "HR Assistant",
    status: "idle",
    config: {
      capabilities: ["recruitment", "payroll", "leave-management"],
      aiModel: "gpt-4",
    },
    taskQueue: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-intake-1",
    type: "intake",
    name: "Intake Processor",
    status: "idle",
    config: {
      capabilities: ["document-processing", "application-review", "verification"],
      aiModel: "gpt-4",
    },
    taskQueue: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-onboarding-1",
    type: "onboarding",
    name: "Onboarding Coordinator",
    status: "idle",
    config: {
      capabilities: ["schedule-management", "training-tracking", "completion-monitoring"],
      aiModel: "gpt-4",
    },
    taskQueue: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-frontdesk-1",
    type: "frontdesk",
    name: "Front Desk Agent",
    status: "idle",
    config: {
      capabilities: ["visitor-check-in", "appointment-management", "message-routing"],
      aiModel: "gpt-4",
    },
    taskQueue: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-campaign-1",
    type: "campaign",
    name: "Campaign Generator",
    status: "idle",
    config: {
      capabilities: ["campaign-creation", "content-generation", "ad-generation"],
      aiModel: "gpt-4",
    },
    taskQueue: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "Summer Recruitment Drive",
    description: "Multi-channel campaign to attract top talent",
    status: "active",
    content: "Join our team this summer and grow with us!",
    audience: { ageRange: "25-45", education: "Bachelor's+", location: "US" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "camp-2",
    title: "Q2 Onboarding Campaign",
    description: "Campaign for onboarding new employees",
    status: "active",
    content: "Welcome to our growing community!",
    audience: { type: "new-employees", departments: ["tech", "operations"] },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
