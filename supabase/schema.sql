
-- This script is designed to be idempotent, meaning you can run it multiple
-- times without causing errors or duplicating data.

-- 0. Enable the http extension if not already enabled.
-- This is required for using webhooks, for example with Stripe.
CREATE EXTENSION IF NOT EXISTS http;

-- 1. Create a `profiles` table
-- This table is designed to store public-facing user data.
-- It is connected to the `auth.users` table via a foreign key.
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  avatar_url text
);

-- Set up Row Level Security (RLS) for the profiles table.
-- This ensures that users can only update their own profile and view others'.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Create a trigger to automatically create a profile entry on new user signup.
-- This function is called by the trigger whenever a new user is created in `auth.users`.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$;

-- Drop the trigger if it exists, then create it.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 3. SUBSCRIPTIONS Table
-- Stores user subscription data, linked to the `profiles` table.
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_active boolean DEFAULT false,
  plan_name text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
-- Add RLS policies for subscriptions table
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own subscription." ON public.subscriptions;
CREATE POLICY "Users can view their own subscription." ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- 4. POSTS Table for Community Hub
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  created_at timestamptz DEFAULT now()
);
-- Add RLS policies for posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can view all posts." ON public.posts;
CREATE POLICY "Authenticated users can view all posts." ON public.posts FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Users can insert their own posts." ON public.posts;
CREATE POLICY "Users can insert their own posts." ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own posts." ON public.posts;
CREATE POLICY "Users can update their own posts." ON public.posts FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own posts." ON public.posts;
CREATE POLICY "Users can delete their own posts." ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- 5. COMMENTS Table for Community Hub
CREATE TABLE IF NOT EXISTS public.comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    content text,
    created_at timestamptz DEFAULT now()
);
-- Add RLS policies for comments table
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can view all comments." ON public.comments;
CREATE POLICY "Authenticated users can view all comments." ON public.comments FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Users can insert their own comments." ON public.comments;
CREATE POLICY "Users can insert their own comments." ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own comments." ON public.comments;
CREATE POLICY "Users can update their own comments." ON public.comments FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own comments." ON public.comments;
CREATE POLICY "Users can delete their own comments." ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- 6. USER_SUBTOPIC_PROGRESS Table
-- Tracks which subtopics a user has completed.
CREATE TABLE IF NOT EXISTS public.user_subtopic_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subtopic_id text NOT NULL, -- e.g., "1-1", "2-3"
  status text NOT NULL, -- 'unlocked', 'completed'
  score integer,
  completed_at timestamptz,
  UNIQUE(user_id, subtopic_id)
);
-- Add RLS policies for progress table
ALTER TABLE public.user_subtopic_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own progress." ON public.user_subtopic_progress;
CREATE POLICY "Users can manage their own progress." ON public.user_subtopic_progress FOR ALL USING (auth.uid() = user_id);
