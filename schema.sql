
-- Enable Row Level Security (RLS)
-- Make sure to set up policies for each table to control access.

-- PROFILES Table
-- Stores public user information.
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  contact_no text,
  avatar_url text,
  role text default 'user',
  updated_at timestamp with time zone,
  
  primary key (id),
  constraint email_unique unique(email)
);
comment on table public.profiles is 'Stores public-facing user data.';

-- Function to handle new user setup.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, contact_no, avatar_url, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'contact_no',
    new.raw_user_meta_data ->> 'avatar_url',
    'user' -- Default role
  );
  return new;
end;
$$;

-- Trigger to execute the function on new user signup.
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- SUBSCRIPTIONS Table
-- Stores user subscription status.
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  email text references public.profiles(email) on delete set null,
  is_active boolean default false,
  plan_name text, -- e.g., 'Premium', 'Yearly'
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  
  unique(user_id)
);
comment on table public.subscriptions is 'Manages user subscription plans and status.';


-- COUPONS Table
-- Stores discount coupon information.
create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_percent integer not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  expires_at timestamp with time zone
);
comment on table public.coupons is 'Stores discount coupon codes.';

-- Example Coupon
INSERT INTO public.coupons (code, discount_percent, is_active)
VALUES ('WELCOME10', 10, true);


-- TRANSACTIONS Table
-- Logs all payment transaction attempts.
create table public.transactions (
    id uuid primary key default gen_random_uuid(),
    order_id text not null unique,
    user_id uuid not null references public.profiles(id),
    plan_id text not null, -- 'premium' or 'yearly'
    amount numeric(10, 2) not null,
    status text not null, -- e.g., PENDING, SUCCESS, FAILED
    coupon_used text,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);
comment on table public.transactions is 'Logs payment transaction attempts.';

-- Enable RLS for all tables
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.coupons enable row level security;
alter table public.transactions enable row level security;

-- Policies for PROFILES
-- Users can view their own profile.
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);
-- Users can update their own profile.
create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);
-- Admins can do anything.
create policy "Admins can manage all profiles" on public.profiles
  for all using ( (select auth.uid() in ( select id from public.profiles where role = 'admin' )) );


-- Policies for SUBSCRIPTIONS
-- Users can view their own subscription.
create policy "Users can view their own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);
-- Admins can do anything.
create policy "Admins can manage all subscriptions" on public.subscriptions
  for all using ( (select auth.uid() in ( select id from public.profiles where role = 'admin' )) );

-- Policies for COUPONS
-- All authenticated users can view active coupons.
create policy "Authenticated users can view active coupons" on public.coupons
  for select to authenticated with check (is_active = true);
-- Admins can do anything.
create policy "Admins can manage all coupons" on public.coupons
  for all using ( (select auth.uid() in ( select id from public.profiles where role = 'admin' )) );

-- Policies for TRANSACTIONS
-- Users can see their own transactions.
create policy "Users can see their own transactions" on public.transactions
  for select using (auth.uid() = user_id);
-- Admins can do anything.
create policy "Admins can manage all transactions" on public.transactions
  for all using ( (select auth.uid() in ( select id from public.profiles where role = 'admin' )) );

    