-- This script can be used to set up the database schema for the YouthSkillSet app.
--
-- 1. PROFILES Table
--    - Stores public user data.
--    - Mirrors the auth.users table.
--    - Includes a 'role' for role-based access control.
--
-- 2. SUBSCRIPTIONS Table
--    - Manages user subscription status.
--
-- 3. POSTS and COMMENTS Tables
--    - Power the community forum feature.
--
-- 4. TRIGGERS and FUNCTIONS
--    - handle_new_user: Automatically creates a profile when a new user signs up.
--      It also assigns the 'admin' role to 'work@youthskillset.in'.
--    - get_user_role: A helper function to check a user's role.
--
-- 5. ROW-LEVEL SECURITY (RLS) POLICIES
--    - Securely controls who can access or modify data.
--    - Ensures only premium/admin users can use the community hub.

-- PROFILES Table
-- Stores public user data, linked to auth.users.
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable Row Level Security
alter table profiles enable row level security;
-- Policy: Allow users to view any profile.
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);
-- Policy: Allow users to insert their own profile.
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);
-- Policy: Allow users to update their own profile.
create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);


-- SUBSCRIPTIONS Table
-- Manages user subscription status.
create table if not exists subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users on delete cascade not null,
    is_active boolean default false,
    plan_name text,
    expires_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable Row Level Security
alter table subscriptions enable row level security;
-- Policy: Allow users to view their own subscription.
create policy "Users can view their own subscription." on subscriptions
    for select using (auth.uid() = user_id);


-- POSTS Table (for Community Hub)
create table if not exists posts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles on delete cascade not null,
    title text not null,
    content text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable Row Level Security
alter table posts enable row level security;


-- COMMENTS Table (for Community Hub)
create table if not exists comments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles on delete cascade not null,
    post_id uuid references posts on delete cascade not null,
    content text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable Row Level Security
alter table comments enable row level security;


-- FUNCTION to get user role
create or replace function get_user_role(user_id uuid)
returns text as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = user_id;
  return user_role;
end;
$$ language plpgsql security definer;


-- RLS Policies for Community Hub
-- Policy: Allow premium/admin users to view posts.
create policy "Premium or admin users can view posts." on posts
  for select using (
    (get_user_role(auth.uid()) = 'premium') or (get_user_role(auth.uid()) = 'admin')
  );
-- Policy: Allow premium/admin users to create posts.
create policy "Premium or admin users can create posts." on posts
  for insert with check (
    (auth.uid() = user_id) and ((get_user_role(auth.uid()) = 'premium') or (get_user_role(auth.uid()) = 'admin'))
  );

-- Policy: Allow premium/admin users to view comments.
create policy "Premium or admin users can view comments." on comments
  for select using (
    (get_user_role(auth.uid()) = 'premium') or (get_user_role(auth.uid()) = 'admin')
  );
-- Policy: Allow premium/admin users to create comments.
create policy "Premium or admin users can create comments." on comments
  for insert with check (
    (auth.uid() = user_id) and ((get_user_role(auth.uid()) = 'premium') or (get_user_role(auth.uid()) = 'admin'))
  );


-- TRIGGER to create a user profile on new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Insert a new profile for the new user
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  
  -- If the new user's email is the admin email, update their role
  if new.email = 'work@youthskillset.in' then
    update public.profiles
    set role = 'admin'
    where id = new.id;
  end if;

  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists, to avoid errors on re-run
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

