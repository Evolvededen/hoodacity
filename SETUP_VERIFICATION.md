## HoodaCity Multibots - Complete Setup & Verification Guide

### Current Status
- ✅ Landing page with dark luxe design - restored
- ✅ Authentication system (signup/login) - configured
- ✅ Supabase client setup - connected to zqdunlbfiwhgnovafpgs project
- ✅ Department dashboards - protected and ready
- ✅ Generators and Agents framework - ready for Edge Functions
- ⏳ Supabase tables - need to be created
- ⏳ Edge Functions - need to be deployed

---

## Step 1: Create Supabase Tables

Run this SQL in your Supabase SQL Editor (https://app.supabase.com/project/zqdunlbfiwhgnovafpgs/sql):

```sql
-- Create campaigns table
CREATE TABLE campaigns (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed')),
  content TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create agents table
CREATE TABLE agents (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('hr', 'intake', 'onboarding', 'frontdesk', 'campaign')),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'active', 'processing')),
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create agent tasks table
CREATE TABLE agent_tasks (
  id BIGSERIAL PRIMARY KEY,
  agent_id BIGINT REFERENCES agents(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  input JSONB,
  output JSONB,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Create dashboards table
CREATE TABLE dashboards (
  id BIGSERIAL PRIMARY KEY,
  department TEXT NOT NULL CHECK (department IN ('hr', 'intake', 'onboarding', 'frontdesk')),
  name TEXT NOT NULL,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
```

---

## Step 2: Deploy Supabase Edge Functions

From the command line:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Deploy edge functions
supabase functions deploy generate-campaign --project-id zqdunlbfiwhgnovafpgs
supabase functions deploy generate-content --project-id zqdunlbfiwhgnovafpgs
supabase functions deploy generate-ads --project-id zqdunlbfiwhgnovafpgs
supabase functions deploy agent-orchestrator --project-id zqdunlbfiwhgnovafpgs
```

---

## Step 3: Test Authentication

1. Navigate to http://localhost:3000
2. Click "Get Started" button
3. Fill out signup form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: TestPassword123
4. Click "Create Account"
5. You should be redirected to login page with success message
6. Login with your credentials
7. You should be redirected to the dashboards page

---

## Step 4: Verify Dashboards Access

After logging in:
- Navigate to "Dashboards" section
- You should see 4 departments:
  - HR Management
  - Intake Processing
  - Onboarding
  - Front Desk
- Click each one to view department-specific dashboards

---

## Step 5: Test Generators (once Edge Functions deployed)

1. Click "Generators" in the header
2. Choose a generator type:
   - Campaigns
   - Content
   - Ads
3. Fill in the form fields
4. Click "Generate"
5. Preview the generated content
6. Save or export

---

## File Structure Overview

```
app/
├── (preview)/
│   ├── page.tsx              # Landing page with auth
│   └── layout.tsx            # Root layout with AuthProvider
├── auth/
│   ├── signup/page.tsx       # Sign up page
│   └── login/page.tsx        # Login page
├── dashboards/
│   ├── page.tsx              # Dashboard selector (protected)
│   └── [department]/page.tsx # Individual dashboard (protected)
├── generators/
│   ├── page.tsx              # Generator selector (protected)
│   └── [type]/page.tsx       # Generator interface (protected)
├── agents/
│   ├── page.tsx              # Agent dashboard (protected)
│   └── [agentId]/page.tsx    # Agent control panel (protected)
└── api/
    ├── generators/route.ts   # Generator API (calls edge functions)
    └── agents/route.ts       # Agent API (calls edge functions)

lib/
├── supabase.ts               # Supabase client initialization
├── auth-context.tsx          # Authentication context
├── types.ts                  # TypeScript types
├── mock-data.ts              # Mock data for UI
├── generators.ts             # Generator logic
└── services.ts               # Database services

supabase/functions/
├── generate-campaign/        # Campaign generation edge function
├── generate-content/         # Content generation edge function
├── generate-ads/             # Ad generation edge function
└── agent-orchestrator/       # Agent orchestration edge function
```

---

## Troubleshooting

### Issue: Can't create account
- Check Supabase credentials are set in environment variables
- Verify email is not already registered
- Check browser console for error messages

### Issue: Dashboards page is blank
- Ensure user is authenticated (check browser console)
- Clear browser cache and reload
- Verify ProtectedRoute component is working

### Issue: Generators not working
- Edge Functions must be deployed first
- Verify API routes are calling correct edge functions
- Check Supabase function logs in dashboard

### Issue: Agents not showing
- Agent tables must be created in Supabase
- Mock data is available for testing without functions

---

## Environment Variables

Make sure these are set in your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=https://zqdunlbfiwhgnovafpgs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

---

## Next Steps

1. ✅ Restore landing page - DONE
2. ✅ Fix authentication - DONE
3. ⏳ Create Supabase tables - RUN SQL ABOVE
4. ⏳ Deploy Edge Functions - USE COMMANDS ABOVE
5. ⏳ Test all features
6. ⏳ Deploy to Vercel

Questions or issues? Check the DEPLOYMENT_GUIDE.md for more details.
