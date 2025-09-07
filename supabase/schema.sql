
-- Drop existing policies if they exist, to prevent errors on re-running the script.
-- This makes the script idempotent.
DROP POLICY IF EXISTS "Users can view their own posts." ON public.posts;
DROP POLICY IF EXISTS "Users can create posts." ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts." ON public.posts;

DROP POLICY IF EXISTS "Users can view their own comments." ON public.comments;
DROP POLICY IF EXISTS "Users can create comments." ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can view all comments." ON public.comments;

-- USERS Table
-- This table is managed by Supabase Auth. We are just enabling RLS.
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;

-- SUBSCRIPTIONS Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    plan_name text,
    is_active boolean DEFAULT false,
    expires_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz
);
ALTER TABLE IF EXISTS public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own subscription." ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- POSTS Table
CREATE TABLE IF NOT EXISTS public.posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    content text,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE IF EXISTS public.posts ENABLE ROW LEVEL SECURITY;

-- **NEW POLICY**: Any authenticated user can see any post.
CREATE POLICY "Authenticated users can view all posts." ON public.posts FOR SELECT TO authenticated USING (true);
-- Any authenticated user can create a post.
CREATE POLICY "Users can create posts." ON public.posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
-- Users can only update their own posts.
CREATE POLICY "Users can update their own posts." ON public.posts FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- Users can only delete their own posts.
CREATE POLICY "Users can delete their own posts." ON public.posts FOR DELETE USING (auth.uid() = user_id);


-- COMMENTS Table
CREATE TABLE IF NOT EXISTS public.comments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    content text,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE IF EXISTS public.comments ENABLE ROW LEVEL SECURITY;

-- **NEW POLICY**: Any authenticated user can see any comment.
CREATE POLICY "Authenticated users can view all comments." ON public.comments FOR SELECT TO authenticated USING (true);
-- Any authenticated user can create a comment.
CREATE POLICY "Users can create comments." ON public.comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
-- Users can only update their own comments.
CREATE POLICY "Users can update their own comments." ON public.comments FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- Users can only delete their own comments.
CREATE POLICY "Users can delete their own comments." ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- USER_SUBTOPIC_PROGRESS Table
CREATE TABLE IF NOT EXISTS public.user_subtopic_progress (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    subtopic_id text NOT NULL,
    status text,
    score integer,
    completed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, subtopic_id)
);
ALTER TABLE IF EXISTS public.user_subtopic_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own progress." ON public.user_subtopic_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own progress." ON public.user_subtopic_progress FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- This ensures that when a new user signs up via Supabase Auth,
-- a corresponding entry is created in the public.users table.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This trigger calls the function whenever a new user is added to the auth.users table.
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
