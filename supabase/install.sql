
-- Enable the pgcrypto extension if it's not already enabled.
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Create a custom type for user roles if it doesn't exist.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('user', 'premium', 'admin');
    END IF;
END$$;

-- Create the profiles table if it doesn't exist.
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    role user_role DEFAULT 'user' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.profiles IS 'Stores public-facing user data.';

-- Create the subscriptions table if it doesn't exist.
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    plan_name TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.subscriptions IS 'Manages user subscription status.';

-- Create the posts table for the community hub if it doesn't exist.
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.posts IS 'Stores user-created posts in the community hub.';

-- Create the comments table for posts if it doesn't exist.
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.comments IS 'Stores comments on posts.';

-- Create or replace the function to automatically create a profile for a new user.
CREATE OR REPLACE FUNCTION public.create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role)
    VALUES (NEW.id, NEW.email, 'user');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION public.create_user_profile() IS 'Creates a profile for a new user upon registration.';

-- Drop the trigger if it exists, then create it.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();

-- Create or replace function to get the current user's role.
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
DECLARE
    user_role_result TEXT;
BEGIN
    SELECT role::TEXT INTO user_role_result FROM public.profiles WHERE id = auth.uid();
    RETURN user_role_result;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.get_user_role() IS 'Retrieves the role of the currently authenticated user.';


-- POLICIES --

-- Profiles Table Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update their own profile" ON publicprofiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Subscriptions Table Policies
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);
-- Note: Subscriptions are managed by the server/webhook, so no insert/update policies for users.

-- Posts Table Policies
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON public.posts;
CREATE POLICY "Authenticated users can view all posts" ON public.posts
    FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Users can create posts if they are premium" ON public.posts;
CREATE POLICY "Users can create posts if they are premium" ON public.posts
    FOR INSERT WITH CHECK ((SELECT get_user_role()) IN ('premium', 'admin'));
DROP POLICY IF EXISTS "Users can only update their own posts" ON public.posts;
CREATE POLICY "Users can only update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only delete their own posts" ON public.posts;
CREATE POLICY "Users can only delete their own posts" ON public.posts
    FOR DELETE USING (auth.uid() = user_id);

-- Comments Table Policies
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can view all comments" ON public.comments;
CREATE POLICY "Authenticated users can view all comments" ON public.comments
    FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Users can create comments if they are premium" ON public.comments;
CREATE POLICY "Users can create comments if they are premium" ON public.comments
    FOR INSERT WITH CHECK ((SELECT get_user_role()) IN ('premium', 'admin'));
DROP POLICY IF EXISTS "Users can only update their own comments" ON public.comments;
CREATE POLICY "Users can only update their own comments" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only delete their own comments" ON public.comments;
CREATE POLICY "Users can only delete their own comments" ON public.comments
    FOR DELETE USING (auth.uid() = user_id);
