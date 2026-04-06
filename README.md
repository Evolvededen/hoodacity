# HoodaCity Multibots

An AI-powered business management system built with Next.js, Supabase, and modern web technologies. Manage departments, generate content, and orchestrate AI agents.

## 🚀 Features

### 📊 Department Dashboards
- **HR Management**: Employee tracking, recruitment, leave, payroll
- **Intake Processing**: Application management, document verification
- **Onboarding**: Training coordination, cohort management, feedback
- **Front Desk**: Visitor management, appointments, queue control

### ✨ Content Generators
- **Campaign Generator**: AI-powered marketing campaigns
- **Content Generator**: Marketing copy and announcements
- **Ad Generator**: Targeted ads with demographics and design specs

### 🤖 AI Agents
- Autonomous agents for each department
- Task queue and orchestration
- Real-time status monitoring
- Intelligent task routing

### 💾 Supabase Integration
- Cloud database for all data
- Edge Functions for serverless processing
- Real-time updates with Realtime
- Row-level security for data protection

## 📋 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL), Edge Functions (Deno)
- **AI**: Vercel AI SDK, OpenAI GPT-4
- **Deployment**: Vercel, Supabase

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- npm/pnpm/yarn
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/Evolvededen/hoodacity-multibots.git
cd hoodacity-multibots

# Install dependencies
npm install

# Create .env.local with your Supabase credentials
cp .env.example .env.local

# Edit .env.local with your credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

```
app/
├── (preview)           # Chat & main interface
├── dashboards/         # Department dashboards
│   ├── page.tsx       # Dashboard selector
│   └── [department]/page.tsx  # Department dashboard
├── generators/         # Content generators
│   ├── page.tsx       # Generator selector
│   └── [type]/page.tsx      # Generator interface
├── agents/            # Agent management
│   ├── page.tsx       # Agent dashboard
│   └── [agentId]/page.tsx   # Agent control panel
└── api/               # Backend routes

components/
├── dashboard-components.tsx    # Dashboard UI
├── advanced-dashboard-widgets.tsx  # Widget types
├── agent-components.tsx       # Agent UI
└── icons.tsx                 # Icon components

lib/
├── supabase.ts        # Supabase client setup
├── types.ts           # TypeScript types
├── mock-data.ts       # Demo data
├── generators.ts      # AI generation logic
├── services.ts        # Database services
└── dashboard-templates.ts  # Widget templates

supabase/functions/   # Edge Functions
├── generate-campaign/
├── generate-content/
├── generate-ads/
└── agent-orchestrator/
```

## 🎯 Main Features Explained

### Dashboards
Each department has a customized dashboard showing KPIs and metrics:
- Real-time data updates
- Quick action buttons
- Agent task assignment
- Customizable widgets

### Generators
AI-powered content creation:
- **Input**: Topic, audience, style preferences
- **Output**: Full campaign/content/ad with preview
- **Actions**: Save to Supabase, Export, Edit

### Agents
Autonomous task handlers:
- Department-specific agents
- Task queue management
- Real-time processing
- Success/failure tracking

## 🔗 API Endpoints

### POST /api/generators
Generate content using AI

```json
{
  "type": "campaigns|content|ads",
  "title": "Campaign Title",
  "inputs": {
    "Campaign Name": "...",
    "Target Audience": "...",
    ...
  }
}
```

### GET/POST /api/agents
List agents or assign tasks

```json
{
  "type": "hr|intake|onboarding|frontdesk|campaign",
  "taskData": {
    "taskType": "...",
    ...
  }
}
```

## 🛠️ Configuration

### Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anonymous key for client-side operations
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for server operations

Optional:
- `OPENAI_API_KEY`: For advanced AI features

### Supabase Setup

1. Create tables (see DEPLOYMENT_GUIDE.md)
2. Deploy Edge Functions
3. Enable Realtime (optional)
4. Set up Row-Level Security policies

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

### Supabase Edge Functions

```bash
# Install Supabase CLI
npm i -g supabase

# Deploy functions
supabase functions deploy --project-id your_project_id
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📊 Dashboard Widgets

### HR Dashboard
- Employee Overview (total, new, on leave)
- Recruitment Pipeline (open positions, applications)
- Leave Management (pending, approved requests)
- Payroll Status (processed, pending, next run)

### Intake Dashboard
- Applications Status (received, in review, approved, rejected)
- Processing Metrics (average time, on track status)
- Document Verification (pending, verified, rejected)
- Compliance Check (compliance rate, warnings, critical)

### Onboarding Dashboard
- Cohort Progress (active, total participants, completion)
- Training Progress (total modules, completion rate)
- Upcoming Sessions (this week, next week, attendance)
- Participant Feedback (average rating, satisfaction breakdown)

### Front Desk Dashboard
- Daily Activity (visitors, peak hours, busy days)
- Appointments (confirmed, pending, cancelled, no-shows)
- Queue Status (waiting, in service, average wait)
- Messages & Calls (unread, responded, response time)

## 🤖 Agent Types

1. **HR Agent**: Recruitment, payroll, leave management
2. **Intake Agent**: Application review, document verification
3. **Onboarding Agent**: Training coordination, participant tracking
4. **Front Desk Agent**: Visitor check-in, appointment management
5. **Campaign Agent**: Content and ad generation

## 🔄 Workflow

1. **Dashboard**: View department metrics
2. **Generate**: Create content using AI generators
3. **Assign**: Send tasks to agents
4. **Monitor**: Track agent task queue
5. **Review**: Check results and approve

## 🐛 Troubleshooting

**Connection Issues**
- Verify Supabase URL and keys in .env.local
- Check Supabase project status
- Ensure tables are created

**Generation Errors**
- Check OpenAI API key (if used)
- Review API rate limits
- Check browser console for errors

**Agent Issues**
- Verify agent configuration
- Check Supabase Edge Function logs
- Review task input data

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed setup & deployment
- [supabase/functions/README.md](./supabase/functions/README.md) - Edge Functions guide

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

- [ ] User authentication
- [ ] Advanced analytics
- [ ] Real-time notifications
- [ ] Custom report builder
- [ ] Integration with external APIs
- [ ] Mobile app
- [ ] Multi-language support

## 💬 Support

For questions or issues:
1. Check documentation
2. Review GitHub issues
3. Create new issue with details

---

Built with ❤️ by HoodaCity Team


