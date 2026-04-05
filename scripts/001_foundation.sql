-- =============================================
-- RIS Foundation Schema
-- =============================================

-- Enable pgvector extension for embeddings
create extension if not exists vector;

-- =============================================
-- 1. Companies (tenants) table
-- =============================================
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  brand_colors jsonb default '{"primary": "#0f172a", "secondary": "#3b82f6", "accent": "#10b981"}',
  settings jsonb default '{}',
  plan text default 'starter',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists companies_slug_idx on public.companies(slug);

-- =============================================
-- 2. Profiles (users with company membership)
-- =============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  is_admin boolean default false,
  onboarding_completed boolean default false,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists profiles_company_idx on public.profiles(company_id);
create index if not exists profiles_email_idx on public.profiles(email);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================
-- 3. Teams
-- =============================================
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  description text,
  settings jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists teams_company_idx on public.teams(company_id);

-- Team members junction table
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text default 'member',
  created_at timestamp with time zone default now(),
  unique(team_id, profile_id)
);

create index if not exists team_members_team_idx on public.team_members(team_id);
create index if not exists team_members_profile_idx on public.team_members(profile_id);

-- =============================================
-- 4. AI Twins (digital persona per user)
-- =============================================
create table if not exists public.twins (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  bio text,
  personality jsonb default '{}',
  cheat_sheet jsonb default '{}',
  avatar_url text,
  voice_settings jsonb default '{}',
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists twins_profile_idx on public.twins(profile_id);
create index if not exists twins_company_idx on public.twins(company_id);

-- =============================================
-- 5. Intelligences (AI agents)
-- =============================================
create table if not exists public.intelligences (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  twin_id uuid references public.twins(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  name text not null,
  description text,
  avatar_url text,
  system_prompt text,
  model text default 'openai/gpt-4o',
  temperature numeric default 0.7,
  settings jsonb default '{}',
  is_published boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists intelligences_company_idx on public.intelligences(company_id);
create index if not exists intelligences_team_idx on public.intelligences(team_id);
create index if not exists intelligences_twin_idx on public.intelligences(twin_id);

-- =============================================
-- 6. Knowledge Base (RAG documents)
-- =============================================
create table if not exists public.knowledge (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  intelligence_id uuid references public.intelligences(id) on delete cascade,
  title text not null,
  content text,
  source_type text default 'document' check (source_type in ('document', 'url', 'text', 'api')),
  source_url text,
  file_path text,
  metadata jsonb default '{}',
  is_processed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists knowledge_company_idx on public.knowledge(company_id);
create index if not exists knowledge_intelligence_idx on public.knowledge(intelligence_id);

-- Knowledge chunks with embeddings
create table if not exists public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  knowledge_id uuid not null references public.knowledge(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  content text not null,
  embedding vector(1536),
  metadata jsonb default '{}',
  chunk_index integer,
  created_at timestamp with time zone default now()
);

create index if not exists knowledge_chunks_knowledge_idx on public.knowledge_chunks(knowledge_id);
create index if not exists knowledge_chunks_company_idx on public.knowledge_chunks(company_id);

-- Vector similarity search index
create index if not exists knowledge_chunks_embedding_idx on public.knowledge_chunks 
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- =============================================
-- 7. Deployments (channels for intelligences)
-- =============================================
create table if not exists public.deployments (
  id uuid primary key default gen_random_uuid(),
  intelligence_id uuid not null references public.intelligences(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  channel text not null check (channel in ('qr', 'embed', 'link', 'api')),
  name text not null,
  config jsonb default '{}',
  access_code text unique,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists deployments_intelligence_idx on public.deployments(intelligence_id);
create index if not exists deployments_company_idx on public.deployments(company_id);
create index if not exists deployments_access_code_idx on public.deployments(access_code);

-- =============================================
-- 8. Conversations (chat history)
-- =============================================
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  deployment_id uuid references public.deployments(id) on delete set null,
  intelligence_id uuid not null references public.intelligences(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  visitor_id text,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists conversations_deployment_idx on public.conversations(deployment_id);
create index if not exists conversations_intelligence_idx on public.conversations(intelligence_id);
create index if not exists conversations_company_idx on public.conversations(company_id);

-- Messages within conversations
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now()
);

create index if not exists messages_conversation_idx on public.messages(conversation_id);

-- =============================================
-- 9. Analytics
-- =============================================
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  intelligence_id uuid references public.intelligences(id) on delete set null,
  deployment_id uuid references public.deployments(id) on delete set null,
  event_type text not null,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now()
);

create index if not exists analytics_company_idx on public.analytics_events(company_id);
create index if not exists analytics_intelligence_idx on public.analytics_events(intelligence_id);
create index if not exists analytics_created_idx on public.analytics_events(created_at);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.twins enable row level security;
alter table public.intelligences enable row level security;
alter table public.knowledge enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.deployments enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.analytics_events enable row level security;

-- Helper function to get user's company_id
create or replace function public.get_user_company_id()
returns uuid
language sql
security definer
stable
as $$
  select company_id from public.profiles where id = auth.uid()
$$;

-- PROFILES policies
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_select_company" on public.profiles for select using (company_id = get_user_company_id());
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- COMPANIES policies
create policy "companies_select" on public.companies for select using (id = get_user_company_id());
create policy "companies_insert" on public.companies for insert with check (true);
create policy "companies_update" on public.companies for update using (
  id in (select company_id from public.profiles where id = auth.uid() and role in ('owner', 'admin'))
);

-- TEAMS policies
create policy "teams_select" on public.teams for select using (company_id = get_user_company_id());
create policy "teams_insert" on public.teams for insert with check (company_id = get_user_company_id());
create policy "teams_update" on public.teams for update using (company_id = get_user_company_id());
create policy "teams_delete" on public.teams for delete using (company_id = get_user_company_id());

-- TEAM_MEMBERS policies
create policy "team_members_select" on public.team_members for select using (
  team_id in (select id from public.teams where company_id = get_user_company_id())
);
create policy "team_members_insert" on public.team_members for insert with check (
  team_id in (select id from public.teams where company_id = get_user_company_id())
);
create policy "team_members_delete" on public.team_members for delete using (
  team_id in (select id from public.teams where company_id = get_user_company_id())
);

-- TWINS policies
create policy "twins_select" on public.twins for select using (company_id = get_user_company_id());
create policy "twins_insert" on public.twins for insert with check (company_id = get_user_company_id());
create policy "twins_update" on public.twins for update using (company_id = get_user_company_id());
create policy "twins_delete" on public.twins for delete using (company_id = get_user_company_id());

-- INTELLIGENCES policies
create policy "intelligences_select" on public.intelligences for select using (company_id = get_user_company_id());
create policy "intelligences_insert" on public.intelligences for insert with check (company_id = get_user_company_id());
create policy "intelligences_update" on public.intelligences for update using (company_id = get_user_company_id());
create policy "intelligences_delete" on public.intelligences for delete using (company_id = get_user_company_id());

-- KNOWLEDGE policies
create policy "knowledge_select" on public.knowledge for select using (company_id = get_user_company_id());
create policy "knowledge_insert" on public.knowledge for insert with check (company_id = get_user_company_id());
create policy "knowledge_update" on public.knowledge for update using (company_id = get_user_company_id());
create policy "knowledge_delete" on public.knowledge for delete using (company_id = get_user_company_id());

-- KNOWLEDGE_CHUNKS policies
create policy "chunks_select" on public.knowledge_chunks for select using (company_id = get_user_company_id());
create policy "chunks_insert" on public.knowledge_chunks for insert with check (company_id = get_user_company_id());
create policy "chunks_delete" on public.knowledge_chunks for delete using (company_id = get_user_company_id());

-- DEPLOYMENTS policies
create policy "deployments_select" on public.deployments for select using (company_id = get_user_company_id());
create policy "deployments_select_public" on public.deployments for select using (is_active = true);
create policy "deployments_insert" on public.deployments for insert with check (company_id = get_user_company_id());
create policy "deployments_update" on public.deployments for update using (company_id = get_user_company_id());
create policy "deployments_delete" on public.deployments for delete using (company_id = get_user_company_id());

-- CONVERSATIONS policies (allow visitors to create/view their own)
create policy "conversations_select" on public.conversations for select using (company_id = get_user_company_id());
create policy "conversations_insert" on public.conversations for insert with check (true);
create policy "conversations_update" on public.conversations for update using (company_id = get_user_company_id());

-- MESSAGES policies
create policy "messages_select" on public.messages for select using (
  conversation_id in (select id from public.conversations where company_id = get_user_company_id())
);
create policy "messages_insert" on public.messages for insert with check (true);

-- ANALYTICS policies
create policy "analytics_select" on public.analytics_events for select using (company_id = get_user_company_id());
create policy "analytics_insert" on public.analytics_events for insert with check (true);

-- =============================================
-- VECTOR SEARCH FUNCTION
-- =============================================
create or replace function public.match_knowledge(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5,
  filter_company_id uuid default null,
  filter_intelligence_id uuid default null
)
returns table (
  id uuid,
  knowledge_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql
stable
as $$
  select
    kc.id,
    kc.knowledge_id,
    kc.content,
    kc.metadata,
    1 - (kc.embedding <=> query_embedding) as similarity
  from public.knowledge_chunks kc
  join public.knowledge k on k.id = kc.knowledge_id
  where 
    (filter_company_id is null or kc.company_id = filter_company_id)
    and (filter_intelligence_id is null or k.intelligence_id = filter_intelligence_id)
    and 1 - (kc.embedding <=> query_embedding) > match_threshold
  order by kc.embedding <=> query_embedding
  limit match_count;
$$;
