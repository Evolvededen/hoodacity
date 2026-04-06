# HoodaCity Multibots - Complete Setup & Deployment Guide

## Overview

HoodaCity Multibots is an AI-powered business management system with:
- **Department Dashboards**: HR, Intake, Onboarding, Front Desk
- **Content Generators**: Campaigns, Content, and Ad generation with AI
- **AI Agents**: Autonomous agents for each department
- **Supabase Edge Functions**: Real-time serverless processing

## Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repo-url>
cd hoodacity-multibots
npm install
# or
pnpm install
```

### 2. Configure Environment Variables

Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zqdunlbfiwhgnovafpgs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see the app.

## Project Structure

```
hoodacity-multibots/
├── app/
│   ├── (preview)/           # Main layout and chat
│   ├── dashboards/          # Department dashboards
│   ├── generators/          # Content generators
│   ├── agents/              # Agent management
│   └── api/                 # Backend routes
├── components/              # Reusable UI components
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript types
│   ├── mock-data.ts        # Demo data
│   ├── generators.ts       # AI generation logic
│   └── services.ts         # Database services
├── supabase/
│   └── functions/          # Edge Functions
└── public/                 # Static assets
```

## Setting Up Supabase

### 1. Create Required Tables

Run these SQL queries in Supabase:

```sql
-- Campaigns Table
CREATE TABLE campaigns (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  content TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Agents Table
CREATE TABLE agents (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'idle',
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Agent Tasks Table
CREATE TABLE agent_tasks (
  id BIGSERIAL PRIMARY KEY,
  agent_id BIGINT REFERENCES agents(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  input JSONB,
  output JSONB,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Dashboards Table
CREATE TABLE dashboards (
  id BIGSERIAL PRIMARY KEY,
  department TEXT NOT NULL,
  name TEXT NOT NULL,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Deploy Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Deploy generate-campaign function
supabase functions deploy generate-campaign --project-id zqdunlbfiwhgnovafpgs

# Deploy agent-orchestrator function
supabase functions deploy agent-orchestrator --project-id zqdunlbfiwhgnovafpgs

# Deploy content generator
supabase functions deploy generate-content --project-id zqdunlbfiwhgnovafpgs

# Deploy ad generator
supabase functions deploy generate-ads --project-id zqdunlbfiwhgnovafpgs
```

### 3. Enable Realtime (Optional)

For real-time dashboard updates:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE agents;
ALTER PUBLICATION supabase_realtime ADD TABLE agent_tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE dashboards;
```

## Features

### Dashboards
- **HR Dashboard**: Employee metrics, recruitment pipeline, leave management, payroll
- **Intake Dashboard**: Applications, processing time, document verification, compliance
- **Onboarding Dashboard**: Cohort progress, training modules, sessions, feedback
- **Front Desk Dashboard**: Visitors, appointments, queue management, messages

### Generators
- **Campaign Generator**: Creates full marketing campaigns with AI
- **Content Generator**: Generates marketing copy and announcements
- **Ad Generator**: Creates targeted ads with copy and design specifications

### Agents
- **HR Agent**: Handles recruitment, payroll, leave management
- **Intake Agent**: Processes applications and verifies documents
- **Onboarding Agent**: Manages training and participant tracking
- **Front Desk Agent**: Handles visitor check-in and appointments
- **Campaign Agent**: Orchestrates content generation

## API Routes

### Generators
- `POST /api/generators` - Generate content/campaigns/ads
- Accepts: `{ type, title, inputs }`
- Returns: Generated content with preview

### Agents
- `GET /api/agents` - List all agents
- `POST /api/agents` - Assign task to agent
- Accepts: `{ type, taskData }`
- Returns: Task result

## Usage Examples

### Generate a Campaign

```javascript
const response = await fetch("/api/generators", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "campaigns",
    title: "Summer Recruitment",
    inputs: {
      "Campaign Name": "Summer Recruitment 2024",
      "Target Audience": "Software Engineers",
      "Campaign Theme": "Growth & Innovation",
      "Duration": "3 months",
      "Budget": "$50,000",
    },
  }),
});

const result = await response.json();
console.log(result.content); // Generated campaign
```

### Assign Task to Agent

```javascript
const response = await fetch("/api/agents", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "hr",
    taskData: {
      taskType: "recruitment",
      position: "Senior Engineer",
      department: "Engineering",
    },
  }),
});

const result = await response.json();
console.log(result); // Task confirmation
```

## Deployment to Vercel

### 1. Connect Repository

```bash
vercel link
```

### 2. Add Environment Variables

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### 3. Deploy

```bash
vercel deploy --prod
```

## Customization

### Adding New Department

1. Create new dashboard component in `app/dashboards/[department]`
2. Add widgets to `lib/dashboard-templates.ts`
3. Create agent type in `lib/mock-data.ts`
4. Add generator endpoint in `app/api/generators/route.ts`

### Creating Custom Agents

1. Define agent capabilities in `lib/types.ts`
2. Create task handler in agent function
3. Deploy new Supabase Edge Function
4. Add to agent list in agents page

## Troubleshooting

### Supabase Connection Issues
- Verify credentials in `.env.local`
- Check Supabase project URL and keys
- Ensure database tables exist

### Edge Function Errors
- Check Supabase Function logs: Dashboard → Functions → Logs
- Verify CORS headers in function response
- Test with curl:
  ```bash
  curl -X POST https://zqdunlbfiwhgnovafpgs.supabase.co/functions/v1/generate-campaign \
    -H "Authorization: Bearer YOUR_ANON_KEY" \
    -H "Content-Type: application/json" \
    -d '{...}'
  ```

### AI Generation Not Working
- Ensure OpenAI API key is set (if using OpenAI)
- Check AI SDK configuration
- Verify model is available in your region

## Next Steps

1. Connect real Supabase database
2. Implement user authentication
3. Add more dashboard widgets
4. Create custom report generation
5. Implement real-time WebSocket updates
6. Add file upload to Supabase Storage
7. Set up monitoring and analytics

## Support

For issues or questions:
1. Check Supabase dashboard for function logs
2. Review error messages in browser console
3. Check GitHub issues
4. Contact support team
