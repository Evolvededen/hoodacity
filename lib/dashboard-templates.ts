import { DashboardWidget } from "@/lib/types";

export const hrDashboardWidgets: DashboardWidget[] = [
  {
    id: "widget-employees",
    type: "employee-metrics",
    title: "Employee Overview",
    data: {
      total: 245,
      newThisMonth: 8,
      terminated: 1,
      onLeave: 12,
    },
  },
  {
    id: "widget-recruitment",
    type: "recruitment-pipeline",
    title: "Active Recruitment",
    data: {
      openPositions: 12,
      applications: 156,
      inInterviews: 8,
      offers: 2,
    },
  },
  {
    id: "widget-leave",
    type: "leave-management",
    title: "Leave Requests",
    data: {
      pending: 8,
      approved: 24,
      denied: 3,
      totalDays: 156,
    },
  },
  {
    id: "widget-payroll",
    type: "payroll-status",
    title: "Payroll",
    data: {
      processed: 89,
      pending: 3,
      failed: 0,
      nextRun: "April 15",
    },
  },
];

export const intakeDashboardWidgets: DashboardWidget[] = [
  {
    id: "widget-applications",
    type: "applications-overview",
    title: "Applications Status",
    data: {
      received: 89,
      inReview: 23,
      approved: 18,
      rejected: 3,
    },
  },
  {
    id: "widget-processing",
    type: "processing-time",
    title: "Processing Metrics",
    data: {
      avgTime: "3.2 days",
      target: "2 days",
      onTrack: 67,
      delayed: 22,
    },
  },
  {
    id: "widget-documents",
    type: "document-verification",
    title: "Documents",
    data: {
      pending: 42,
      verified: 89,
      rejected: 5,
      resubmitted: 8,
    },
  },
  {
    id: "widget-compliance",
    type: "compliance-check",
    title: "Compliance Status",
    data: {
      compliant: 76,
      warnings: 8,
      critical: 1,
      audited: 92,
    },
  },
];

export const onboardingDashboardWidgets: DashboardWidget[] = [
  {
    id: "widget-cohorts",
    type: "cohort-progress",
    title: "Current Cohorts",
    data: {
      active: 3,
      totalParticipants: 35,
      completed: 18,
      inProgress: 12,
    },
  },
  {
    id: "widget-training",
    type: "training-progress",
    title: "Training Modules",
    data: {
      total: 24,
      completed: 8,
      inProgress: 16,
      completion: "33%",
    },
  },
  {
    id: "widget-sessions",
    type: "session-schedule",
    title: "Upcoming Sessions",
    data: {
      today: 2,
      thisWeek: 8,
      nextWeek: 12,
      attendance: "94%",
    },
  },
  {
    id: "widget-feedback",
    type: "feedback-ratings",
    title: "Participant Feedback",
    data: {
      avgRating: 4.7,
      satisfied: 33,
      neutral: 2,
      unsatisfied: 0,
    },
  },
];

export const frontdeskDashboardWidgets: DashboardWidget[] = [
  {
    id: "widget-visitors",
    type: "visitor-metrics",
    title: "Daily Activity",
    data: {
      visitorsToday: 34,
      avgDaily: 28,
      peakHour: "10-11 AM",
      busyDays: "Mon-Wed",
    },
  },
  {
    id: "widget-appointments",
    type: "appointment-status",
    title: "Today's Appointments",
    data: {
      confirmed: 12,
      pending: 3,
      cancelled: 1,
      noShow: 1,
    },
  },
  {
    id: "widget-queue",
    type: "queue-management",
    title: "Queue Status",
    data: {
      waiting: 5,
      inService: 2,
      avgWaitTime: "8 min",
      longestWait: "14 min",
    },
  },
  {
    id: "widget-messages",
    type: "communication",
    title: "Messages & Calls",
    data: {
      unreadMessages: 7,
      responded: 156,
      avgResponseTime: "2.3 min",
      missedCalls: 3,
    },
  },
];
