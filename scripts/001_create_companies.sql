-- Companies (tenants) table
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

-- Enable RLS
alter table public.companies enable row level security;

-- Companies are viewable by their members (profiles with matching company_id)
create policy "companies_select_members" on public.companies
  for select using (
    id in (
      select company_id from public.profiles where id = auth.uid()
    )
  );

-- Only company admins can update their company
create policy "companies_update_admin" on public.companies
  for update using (
    id in (
      select company_id from public.profiles where id = auth.uid() and is_admin = true
    )
  );

-- Index for slug lookups
create index if not exists companies_slug_idx on public.companies(slug);
