-- Add trial columns to company_pricing
alter table public.company_pricing 
add column if not exists trial_start timestamp with time zone,
add column if not exists trial_end timestamp with time zone,
add column if not exists is_trial boolean default true,
add column if not exists payment_method text,
add column if not exists stripe_customer_id text,
add column if not exists stripe_subscription_id text;

-- Update the auto-plan function to include 14-day trial
create or replace function public.handle_new_company_plan()
returns trigger as $$
declare
  starter_plan_id uuid;
begin
  -- Get the starter plan ID
  select id into starter_plan_id from public.pricing_plans where name = 'starter' limit 1;
  
  -- Create company pricing record with starter plan and 14-day trial
  if starter_plan_id is not null then
    insert into public.company_pricing (
      company_id, 
      plan_id, 
      billing_cycle, 
      is_concierge,
      is_trial,
      trial_start,
      trial_end
    )
    values (
      new.id, 
      starter_plan_id, 
      'yearly',  -- Default to annual billing
      false,
      true,      -- Start with trial
      now(),
      now() + interval '14 days'  -- 14-day trial
    )
    on conflict (company_id) do nothing;
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- =============================================
-- ASSIGN ADMIN AND CLIENT USERS
-- =============================================

-- Set desire1319@yahoo.com as ADMIN (full platform access)
update public.profiles 
set is_admin = true, role = 'owner'
where lower(email) = lower('desire1319@yahoo.com');

-- Set Hoodacity.ai@gmail.com as CLIENT (regular member)
update public.profiles 
set is_admin = false, role = 'member'
where lower(email) = lower('Hoodacity.ai@gmail.com');
