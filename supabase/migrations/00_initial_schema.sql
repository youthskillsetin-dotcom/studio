-- Create custom ENUM types for roles and statuses to ensure data integrity.
CREATE TYPE public.user_role AS ENUM ('user', 'premium', 'admin');
CREATE TYPE public.transaction_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
CREATE TYPE public.subscription_plan_name AS ENUM ('Premium', 'Yearly');

-- PROFILES TABLE
-- This table stores public user data.
CREATE TABLE public.profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text,
    avatar_url text,
    contact_no text,
    role user_role NOT NULL DEFAULT 'user',
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.profiles IS 'Stores public-facing user profile information.';

-- SUBSCRIPTIONS TABLE
-- This table manages user subscription status.
CREATE TABLE public.subscriptions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    is_active boolean NOT NULL DEFAULT false,
    plan_name subscription_plan_name,
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.subscriptions IS 'Manages user subscription plans and status.';

-- TRANSACTIONS TABLE
-- This table logs payment transaction events.
CREATE TABLE public.transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id text NOT NULL UNIQUE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id text,
    amount numeric(10,2) NOT NULL,
    status transaction_status NOT NULL DEFAULT 'PENDING',
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.transactions IS 'Logs all payment transactions.';


-- POSTS TABLE
-- For the community forum feature.
CREATE TABLE public.posts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);
COMMENT ON TABLE public.posts IS 'Stores posts for the community forum.';


-- COMMENTS TABLE
-- For the community forum feature.
CREATE TABLE public.comments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE
);
COMMENT ON TABLE public.comments IS 'Stores comments on posts in the community forum.';


-- TRIGGER to automatically create a profile for a new user.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, contact_no, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'contact_no',
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Subscriptions Policies
CREATE POLICY "Users can view their own subscription." ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Transactions Policies
CREATE POLICY "Users can view their own transactions." ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Posts Policies
CREATE POLICY "Posts are viewable by everyone." ON public.posts
  FOR SELECT USING (true);
CREATE POLICY "Users can create their own posts." ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts." ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts." ON public.posts
  FOR DELETE USING (auth.uid() = user_id);

-- Comments Policies
CREATE POLICY "Comments are viewable by everyone." ON public.comments
  FOR SELECT USING (true);
CREATE POLICY "Users can create comments." ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments." ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments." ON public.comments
  FOR DELETE USING (auth.uid() = user_id);
