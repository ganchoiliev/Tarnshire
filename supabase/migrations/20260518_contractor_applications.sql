-- 20260518 contractor_applications
-- Recruitment lead-capture table behind /careers.
-- All writes go via the submit-contractor-application Edge Function using service_role.
-- RLS is enabled with NO policies = default deny: anon and authenticated read/write blocked.

create table public.contractor_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- About you (Section 1)
  name text not null,
  email text not null,
  phone text not null,
  borough_preference text not null,
  experience_months text not null,
  languages text[] not null default '{}',
  hours_per_week text not null,
  why_tarnshire text,

  -- The basics (Section 2)
  right_to_work text not null,
  dbs_willing text not null,
  self_employed_ok text not null,
  references text not null,
  anything_else text,

  -- Vetting status (ops updates these manually)
  status text not null default 'new',
  internal_notes text,
  assigned_to uuid,
  interview_scheduled_for timestamptz,
  references_checked_at timestamptz,
  dbs_initiated_at timestamptz,
  approved_at timestamptz,

  constraint contractor_applications_status_check check (status in (
    'new', 'reviewing', 'interview_scheduled', 'references_checking',
    'dbs_pending', 'trial_clean_scheduled', 'approved', 'rejected'
  ))
);

create index contractor_applications_status_idx on public.contractor_applications(status);
create index contractor_applications_created_at_idx on public.contractor_applications(created_at desc);
create index contractor_applications_borough_idx on public.contractor_applications(borough_preference);

-- Reuses the public.set_updated_at() function defined by 20260517_quote_requests.sql.
create trigger contractor_applications_set_updated_at
before update on public.contractor_applications
for each row execute function public.set_updated_at();

alter table public.contractor_applications enable row level security;
-- NO POLICIES = default deny. Only service_role bypasses RLS.
