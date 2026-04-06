# Supabase Edge Functions Setup

This directory contains Supabase Edge Functions for the HoodaCity Multibots app. Edge Functions run on Deno and can directly access Supabase tables and execute AI operations.

## Available Edge Functions

### 1. generate-campaign
- **Path**: `supabase/functions/generate-campaign`
- **Method**: POST
- **Purpose**: Generate marketing campaigns with AI
- **Input**:
  ```json
  {
    "title": "Campaign Name",
    "targetAudience": "Target description",
    "theme": "Campaign theme",
    "duration": "Duration",
    "budget": "Budget amount"
  }
  ```

### 2. generate-content
- **Path**: `supabase/functions/generate-content`
- **Method**: POST
- **Purpose**: Generate marketing content and copy
- **Input**:
  ```json
  {
    "title": "Content Title",
    "topic": "Topic description",
    "tone": "Tone style",
    "length": "Length preference",
    "platform": "Target platform"
  }
  ```

### 3. generate-ads
- **Path**: `supabase/functions/generate-ads`
- **Method**: POST
- **Purpose**: Generate targeted ads with copy and design specs
- **Input**:
  ```json
  {
    "title": "Ad Title",
    "demographics": "Target demographics",
    "cta": "Call to action",
    "theme": "Design theme",
    "imageUrl": "Optional image URL"
  }
  ```

### 4. agent-orchestrator
- **Path**: `supabase/functions/agent-orchestrator`
- **Method**: POST
- **Purpose**: Orchestrate agent task routing and execution
- **Input**:
  ```json
  {
    "taskType": "task type",
    "agentType": "hr|intake|onboarding|frontdesk|campaign",
    "payload": { /* task-specific data */ }
  }
  ```

### 5. Agent Type Functions
- `agent-hr`: Handle HR-related tasks
- `agent-intake`: Handle intake processing tasks
- `agent-onboarding`: Handle onboarding tasks
- `agent-frontdesk`: Handle front desk tasks
- `agent-campaign`: Handle campaign-related tasks

## Deployment

To deploy an edge function:

```bash
supabase functions deploy generate-campaign --project-id zqdunlbfiwhgnovafpgs
```

## Environment Variables

The following environment variables are available in Edge Functions:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (for privileged operations)

## Database Tables

The following tables are required:

```sql
-- Campaigns table
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

-- Agents table
CREATE TABLE agents (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'idle',
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Agent tasks table
CREATE TABLE agent_tasks (
  id BIGSERIAL PRIMARY KEY,
  agent_id BIGINT REFERENCES agents(id),
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  input JSONB,
  output JSONB,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Dashboards table
CREATE TABLE dashboards (
  id BIGSERIAL PRIMARY KEY,
  department TEXT NOT NULL,
  name TEXT NOT NULL,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Next Steps

1. Create the SQL tables in your Supabase project
2. Deploy each edge function using the CLI
3. Test functions using the Supabase dashboard
4. Connect frontend generators to edge functions via API routes
