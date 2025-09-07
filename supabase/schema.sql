
-- USER_SUBTOPIC_PROGRESS Table
-- Stores the progress of each user on each subtopic.
create table public.user_subtopic_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  subtopic_id text not null,
  completed_at timestamptz,
  score integer,
  status text check (status in ('locked', 'unlocked', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, subtopic_id)
);
alter table public.user_subtopic_progress enable row level security;

-- SUBSCRIPTIONS Table
-- Stores user subscription information.
create table public.subscriptions (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  is_active boolean not null default false,
  plan_name text check (plan_name in ('Premium', 'Yearly')),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;


-- POSTS Table
-- Stores posts for the community hub.
create table public.posts (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.posts enable row level security;

-- COMMENTS Table
-- Stores comments for posts in the community hub.
create table public.comments (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.comments enable row level security;


-- POLICIES
-- Set up Row Level Security policies for the tables.

-- Enable RLS for all tables
-- -- 1. Authenticated users can insert their own progress
create policy "Authenticated users can insert their own progress"
on public.user_subtopic_progress
for insert to authenticated
with check (auth.uid() = user_id);

-- -- 2. Users can view their own progress
create policy "Users can view their own progress"
on public.user_subtopic_progress
for select to authenticated
using (auth.uid() = user_id);

-- -- 3. Users can update their own progress
create policy "Users can update their own progress"
on public.user_subtopic_progress
for update to authenticated
using (auth.uid() = user_id);


-- Policies for SUBSCRIPTIONS table
-- -- 1. Allow authenticated users to see all subscriptions
create policy "Allow authenticated users to see all subscriptions"
on public.subscriptions
for select to authenticated
using (true);

-- -- 2. Allow users to insert their own subscription
create policy "Allow users to insert their own subscription"
on public.subscriptions
for insert to authenticated
with check (auth.uid() = user_id);


-- Policies for POSTS table
-- -- 1. Authenticated users can create posts.
create policy "Authenticated users can create posts"
on public.posts
for insert to authenticated
with check (auth.uid() = user_id);

-- -- 2. Authenticated users can view all posts.
create policy "Authenticated users can view all posts"
on public.posts
for select to authenticated
using (true);

-- Policies for COMMENTS table
-- -- 1. Authenticated users can add comments.
create policy "Authenticated users can add comments"
on public.comments
for insert to authenticated
with check (auth.uid() = user_id);

-- -- 2. Authenticated users can view all comments.
create policy "Authenticated users can view all comments"
on public.comments
for select to authenticated
using (true);
