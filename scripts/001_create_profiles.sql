-- Create profiles table with role and subscription tracking
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  registered_id text unique not null,
  owner_name text,
  role text not null check (role in ('messenger_basic', 'messenger_pro', 'entrepreneur', 'creator', 'client', 'student', 'admin')),
  subscription_level text not null default 'free' check (subscription_level in ('free', 'basic', 'pro', 'enterprise')),
  intelligence_name text,
  intelligence_id text,
  has_affiliate_license boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "admin_select_all" on public.profiles for select using (
  (select role from public.profiles where id = auth.uid()) = 'admin'
);

-- Auto-generate Registered ID and create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_registered_id text;
begin
  new_registered_id := 'RID-' || to_char(now(), 'YYYYMMDD') || '-' || substr(new.id::text, 1, 8);
  
  insert into public.profiles (id, registered_id, owner_name, role)
  values (
    new.id,
    new_registered_id,
    coalesce(new.raw_user_meta_data ->> 'owner_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'student')
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
