-- 20260526 bookings.service_type
-- Adds the Deep Clean tier as a second product alongside the standard recurring clean.
-- Run in Supabase Dashboard → SQL Editor; PostgREST cache must be reloaded afterwards.

alter table public.bookings
  add column if not exists service_type text not null default 'standard'
    check (service_type in ('standard', 'deep_clean'));

-- Belt-and-braces backfill (the default handles new inserts; this covers any pre-existing rows).
update public.bookings set service_type = 'standard' where service_type is null;

create index if not exists bookings_service_type_idx on public.bookings (service_type);

-- Refresh PostgREST so the Edge Functions and admin reads see the new column without a restart.
notify pgrst, 'reload schema';
