-- POLICIES for PROFILES table
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- POLICIES for SUBSCRIPTIONS table
DROP POLICY IF EXISTS "Users can view their own subscriptions." ON public.subscriptions;
CREATE POLICY "Users can view their own subscriptions." ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);


-- POLICIES for POSTS table
DROP POLICY IF EXISTS "Premium users can view all posts." ON public.posts;
CREATE POLICY "Premium users can view all posts." ON public.posts FOR SELECT USING (
  get_user_role() IN ('premium', 'admin')
);

DROP POLICY IF EXISTS "Premium users can create posts." ON public.posts;
CREATE POLICY "Premium users can create posts." ON public.posts FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  get_user_role() IN ('premium', 'admin')
);

DROP POLICY IF EXISTS "Post authors can update their own posts." ON public.posts;
CREATE POLICY "Post authors can update their own posts." ON public.posts FOR UPDATE USING (
    auth.uid() = user_id
);

DROP POLICY IF EXISTS "Post authors can delete their own posts." ON public.posts;
CREATE POLICY "Post authors can delete their own posts." ON public.posts FOR DELETE USING (
    auth.uid() = user_id
);


-- POLICIES for COMMENTS table
DROP POLICY IF EXISTS "Premium users can view all comments." ON public.comments;
CREATE POLICY "Premium users can view all comments." ON public.comments FOR SELECT USING (
  get_user_role() IN ('premium', 'admin')
);

DROP POLICY IF EXISTS "Premium users can create comments." ON public.comments;
CREATE POLICY "Premium users can create comments." ON public.comments FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  get_user_role() IN ('premium', 'admin')
);

DROP POLICY IF EXISTS "Comment authors can update their own comments." ON public.comments;
CREATE POLICY "Comment authors can update their own comments." ON public.comments FOR UPDATE USING (
    auth.uid() = user_id
);

DROP POLICY IF EXISTS "Comment authors can delete their own comments." ON public.comments;
CREATE POLICY "Comment authors can delete their own comments." ON public.comments FOR DELETE USING (
    auth.uid()
     = user_id
);

-- USER_ROLE type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('user', 'premium', 'admin');
    END IF;
END$$;


-- PROFILES table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role user_role DEFAULT 'user'::user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- SUBSCRIPTIONS Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    plan_name TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- POSTS Table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id)
);


-- COMMENTS Table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);


-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role
LANGUAGE plpgsql
AS $$
DECLARE
    user_role_result user_role;
BEGIN
    SELECT role INTO user_role_result FROM public.profiles WHERE id = auth.uid();
    RETURN user_role_result;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 'user'::user_role;
END;
$$;


-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Set the role to 'admin' if the email matches, otherwise default to 'user'
    IF new.email = 'work@youthskillset.in' THEN
        INSERT INTO public.profiles (id, email, role)
        VALUES (new.id, new.email, 'admin');
    ELSE
        INSERT INTO public.profiles (id, email, role)
        VALUES (new.id, new.email, 'user');
    END IF;
    RETURN new;
END;
$$;


-- Trigger to call handle_new_user on new user signup in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;