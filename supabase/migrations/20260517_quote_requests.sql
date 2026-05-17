-- 20260517 quote_requests
-- B2B lead-capture table behind /business/quote.
-- All writes go via the submit-quote-request Edge Function using service_role.
-- RLS is enabled with NO policies = default deny: anon and authenticated read/write blocked.

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sector text not null,
  size_band text not null,
  num_sites text not null,
  frequency text not null,
  scope text[] not null default '{}',
  compliance text[] not null default '{}',
  walkthrough_date date not null,
  walkthrough_time_slot text not null,
  contact_name text not null,
  contact_role text,
  contact_company text not null,
  contact_email text not null,
  contact_phone text,
  status text not null default 'new',
  internal_notes text,
  assigned_to uuid,
  walkthrough_scheduled_for timestamptz,
  constraint quote_requests_status_check check (status in ('new', 'walkthrough_booked', 'quoted', 'won', 'lost'))
);

create index quote_requests_status_idx on public.quote_requests(status);
create index quote_requests_created_at_idx on public.quote_requests(created_at desc);
create index quote_requests_contact_email_idx on public.quote_requests(contact_email);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger quote_requests_set_updated_at
before update on public.quote_requests
for each row execute function public.set_updated_at();

alter table public.quote_requests enable row level security;
-- NO POLICIES = default deny. Only service_role bypasses RLS.
