--
-- PROFILES Table
-- This table stores public profile data for each user.
--
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  email text unique,
  role text default 'user'
);
-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile for new users.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


--
-- SUBSCRIPTIONS Table
-- This table stores user subscription information.
--
create table subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    is_active boolean default false,
    plan_name text,
    expires_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Set up Row Level Security (RLS)
alter table subscriptions
  enable row level security;

create policy "Users can view their own subscriptions." on subscriptions
  for select using (auth.uid() = user_id);


--
-- POSTS Table
-- This table stores community forum posts.
--
create table posts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Set up Row Level Security (RLS)
alter table posts
  enable row level security;

-- Helper function to check user role
create function get_user_role(user_id uuid)
returns text as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = user_id;
  return user_role;
end;
$$ language plpgsql security definer;


create policy "Premium users and admins can view all posts." on posts
  for select using (
    (get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin')
  );

create policy "Premium users and admins can create posts." on posts
  for insert with check (
    (auth.uid() = user_id) AND
    ((get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin'))
  );

create policy "Users can update their own posts." on posts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own posts." on posts
    for delete using (auth.uid() = user_id);


--
-- COMMENTS Table
-- This table stores comments on posts.
--
create table comments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    post_id uuid references public.posts(id) on delete cascade not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Set up Row Level Security (RLS)
alter table comments
  enable row level security;

create policy "Premium users and admins can view all comments." on comments
  for select using (
    (get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin')
  );

create policy "Premium users and admins can create comments." on comments
  for insert with check (
    (auth.uid() = user_id) AND
    ((get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin'))
  );

create policy "Users can update their own comments." on comments
  for update using (auth.uid() = user_id);

create policy "Users can delete their own comments." on comments
    for delete using (auth.uid() = user_id);
