-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

-- Custom Types
DROP TYPE IF EXISTS public.user_role;
CREATE TYPE public.user_role AS ENUM ('user', 'premium', 'admin');

-- PROFILES Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  role user_role DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
DECLARE
  user_role_result user_role;
BEGIN
  SELECT role INTO user_role_result FROM public.profiles WHERE id = auth.uid();
  RETURN user_role_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to create a public profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    new.id,
    new.email,
    CASE
      WHEN new.email = 'work@youthskillset.in' THEN 'admin'::user_role
      ELSE 'user'::user_role
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- SUBSCRIPTIONS Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT FALSE,
  plan_name TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- POSTS Table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMMENTS Table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES --

-- Profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Subscriptions
DROP POLICY IF EXISTS "Users can view their own subscription." ON public.subscriptions;
CREATE POLICY "Users can view their own subscription."
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Posts
DROP POLICY IF EXISTS "Allow read access to premium/admin users" ON public.posts;
CREATE POLICY "Allow read access to premium/admin users"
    ON public.posts FOR SELECT
    TO authenticated
    USING ( get_user_role() IN ('admin', 'premium') );

DROP POLICY IF EXISTS "Allow insert access to premium/admin users" ON public.posts;
CREATE POLICY "Allow insert access to premium/admin users"
    ON public.posts FOR INSERT
    TO authenticated
    WITH CHECK ( get_user_role() IN ('admin', 'premium') );

-- Comments
DROP POLICY IF EXISTS "Allow read access to premium/admin users" ON public.comments;
CREATE POLICY "Allow read access to premium/admin users"
    ON public.comments FOR SELECT
    TO authenticated
    USING ( get_user_role() IN ('admin', 'premium') );

DROP POLICY IF EXISTS "Allow insert access to premium/admin users" ON public.comments;
CREATE POLICY "Allow insert access to premium/admin users"
    ON public.comments FOR INSERT
    TO authenticated
    WITH CHECK ( get_user_role() IN ('admin', 'premium') );
