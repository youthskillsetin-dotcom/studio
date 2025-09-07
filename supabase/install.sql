--
-- PROFILES Table
--
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- SUBSCRIPTIONS Table
--
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_name TEXT,
  is_active BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;


--
-- POSTS Table
--
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;


--
-- COMMENTS Table
--
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;


--
-- HELPER FUNCTION: get_user_role
--
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


--
-- RLS POLICIES
--

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
DROP POLICY IF EXISTS "Users can view their own subscriptions." ON public.subscriptions;
CREATE POLICY "Users can view their own subscriptions."
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Posts
DROP POLICY IF EXISTS "Premium/Admin users can view all posts." ON public.posts;
CREATE POLICY "Premium/Admin users can view all posts."
  ON public.posts FOR SELECT
  USING (get_user_role() IN ('premium', 'admin'));

DROP POLICY IF EXISTS "Premium/Admin users can create posts." ON public.posts;
CREATE POLICY "Premium/Admin users can create posts."
  ON public.posts FOR INSERT
  WITH CHECK (get_user_role() IN ('premium', 'admin') AND auth.uid() = user_id);


-- Comments
DROP POLICY IF EXISTS "Premium/Admin users can view all comments." ON public.comments;
CREATE POLICY "Premium/Admin users can view all comments."
  ON public.comments FOR SELECT
  USING (get_user_role() IN ('premium', 'admin'));

DROP POLICY IF EXISTS "Premium/Admin users can create comments." ON public.comments;
CREATE POLICY "Premium/Admin users can create comments."
  ON public.comments FOR INSERT
  WITH CHECK (get_user_role() IN ('premium', 'admin') AND auth.uid() = user_id);


--
-- TRIGGERS
--

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Assign 'admin' role if the email matches, otherwise default to 'user'
  IF new.email = 'work@youthskillset.in' THEN
    user_role := 'admin';
  ELSE
    user_role := 'user';
  END IF;

  -- Insert into public.profiles
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, user_role);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
