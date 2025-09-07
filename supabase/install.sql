
-- Enable the pgcrypto extension if it's not already enabled
create extension if not exists "pgcrypto" with schema "extensions";

-- Drop existing tables if they exist to ensure a clean slate
drop table if exists public.comments;
drop table if exists public.posts;
drop table if exists public.subscriptions;
drop table if exists public.user_subtopic_progress;
drop table if exists public.profiles;


-- Create the 'profiles' table to store user information
create table if not exists public.profiles (
  id uuid references auth.users(id) not null primary key,
  email text,
  role text default 'user'::text,
  created_at timestamp with time zone default now()
);
comment on table public.profiles is 'Stores public user information.';


-- Create the 'subscriptions' table to manage user subscription status
create table if not exists public.subscriptions (
    id uuid default extensions.gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) not null unique,
    is_active boolean default false,
    plan_name text,
    expires_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);
comment on table public.subscriptions is 'Stores user subscription details.';


-- Create the 'posts' table for the community forum
create table if not exists public.posts (
  id uuid default extensions.gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  title text not null,
  content text,
  created_at timestamp with time zone default now()
);
comment on table public.posts is 'Stores community forum posts.';


-- Create the 'comments' table for post replies
create table if not exists public.comments (
  id uuid default extensions.gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  post_id uuid references public.posts(id) not null,
  content text,
  created_at timestamp with time zone default now()
);
comment on table public.comments is 'Stores comments on community posts.';


-- Create the 'user_subtopic_progress' table
create table if not exists public.user_subtopic_progress (
  id uuid default extensions.gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  subtopic_id text not null,
  completed_at timestamp with time zone,
  score integer,
  status text default 'unlocked'::text not null,
  created_at timestamp with time zone default now(),
  constraint user_subtopic_progress_user_id_subtopic_id_key unique (user_id, subtopic_id)
);
comment on table public.user_subtopic_progress is 'Tracks user progress on subtopics.';


-- Set up Row Level Security (RLS) for all tables
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.user_subtopic_progress enable row level security;

-- Create policies for 'profiles'
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile." on public.profiles for update using (auth.uid() = id);

-- Create policies for 'subscriptions'
create policy "Users can view their own subscription." on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can insert their own subscription." on public.subscriptions for insert with check (auth.uid() = user_id);
create policy "Users can update their own subscription." on public.subscriptions for update using (auth.uid() = user_id);

-- Create policies for 'posts'
create policy "Posts are viewable by everyone." on public.posts for select using (true);
create policy "Users can create their own posts." on public.posts for insert with check (auth.uid() = user_id);
create policy "Users can delete their own posts." on public.posts for delete using (auth.uid() = user_id);

-- Create policies for 'comments'
create policy "Comments are viewable by everyone." on public.comments for select using (true);
create policy "Users can create their own comments." on public.comments for insert with check (auth.uid() = user_id);
create policy "Users can delete their own comments." on public.comments for delete using (auth.uid() = user_id);

-- Create policies for 'user_subtopic_progress'
create policy "Users can view their own progress." on public.user_subtopic_progress for select using (auth.uid() = user_id);
create policy "Users can insert their own progress." on public.user_subtopic_progress for insert with check (auth.uid() = user_id);
create policy "Users can update their own progress." on public.user_subtopic_progress for update using (auth.uid() = user_id);


-- Function to handle new user sign-ups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

-- Trigger to execute the function on new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

