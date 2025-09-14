
-- Create a table for public profiles
create table if not exists profiles (
  id uuid not null primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  contact_no text,
  role text default 'user',
  created_at timestamp with time zone default now()
);
comment on table profiles is 'Public profile information for each user.';

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile for new users.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email, contact_no, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email, new.raw_user_meta_data->>'contact_no', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it exists to avoid errors on re-run
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Subscriptions Table
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  plan_name text,
  is_active boolean not null default false,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
comment on table subscriptions is 'Manages user subscription status.';

-- RLS for subscriptions
alter table subscriptions enable row level security;

create policy "Users can view their own subscription." on subscriptions
  for select using (auth.uid() = user_id);


-- Transactions Table
create table if not exists transactions (
    id uuid primary key default gen_random_uuid(),
    order_id text not null unique,
    user_id uuid not null references public.profiles(id) on delete cascade,
    plan_id text not null,
    amount numeric(10, 2) not null,
    status text not null default 'PENDING',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);
comment on table transactions is 'Logs all payment transactions.';

-- RLS for transactions
alter table transactions enable row level security;
create policy "Users can view their own transactions." on transactions
    for select using (auth.uid() = user_id);


-- Community Posts Table
create table if not exists posts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    content text not null,
    created_at timestamp with time zone default now()
);
comment on table posts is 'Stores posts for the community forum.';

-- RLS for posts
alter table posts enable row level security;

create policy "Authenticated users can view all posts." on posts
    for select using (auth.role() = 'authenticated');

create policy "Users can insert their own posts." on posts
    for insert with check (auth.uid() = user_id);

create policy "Users can update their own posts." on posts
    for update using (auth.uid() = user_id);

create policy "Users can delete their own posts." on posts
    for delete using (auth.uid() = user_id);


-- Community Comments Table
create table if not exists comments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    post_id uuid not null references public.posts(id) on delete cascade,
    content text not null,
    created_at timestamp with time zone default now()
);
comment on table comments is 'Stores comments for community posts.';

-- RLS for comments
alter table comments enable row level security;

create policy "Authenticated users can view all comments." on comments
    for select using (auth.role() = 'authenticated');

create policy "Users can insert their own comments." on comments
    for insert with check (auth.uid() = user_id);

create policy "Users can update their own comments." on comments
    for update using (auth.uid() = user_id);

create policy "Users can delete their own comments." on comments
    for delete using (auth.uid() = user_id);

