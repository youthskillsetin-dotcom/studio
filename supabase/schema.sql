--
-- PROFILES Table
-- This table stores public profile information for each user.
--
CREATE TABLE
  public.profiles (
    id UUID NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NULL,
    email CHARACTER VARYING NULL,
    role TEXT NOT NULL DEFAULT 'user',
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_email_key UNIQUE (email),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
  );

--
-- Set up Row Level Security (RLS)
--
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop and create policies to make the script idempotent
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid () = id);

DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid () = id);


--
-- Function to create a profile for a new user.
--
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    new.id,
    new.email,
    CASE
      WHEN new.email = 'work@youthskillset.in' THEN 'admin'::text
      ELSE 'user'::text
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

--
-- Trigger to call the function when a new user signs up.
--
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();


--
-- SUBSCRIPTIONS Table
-- This table stores user subscription information.
--
CREATE TABLE
  public.subscriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT false,
    plan_name TEXT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
    CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
  );
  
--
-- Set up Row Level Security (RLS) for Subscriptions
--
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated read access" ON public.subscriptions;
CREATE POLICY "Allow authenticated read access" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid () = user_id);

--
-- POSTS Table
-- This table stores posts for the community hub.
--
CREATE TABLE
  public.posts (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
  );
  
--
-- Set up Row Level Security (RLS) for Posts
--
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id uuid)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = user_id;
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


DROP POLICY IF EXISTS "Allow premium/admin read access" ON public.posts;
CREATE POLICY "Allow premium/admin read access" ON public.posts
FOR SELECT TO authenticated
USING (
  (get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin')
);

DROP POLICY IF EXISTS "Allow premium/admin insert access" ON public.posts;
CREATE POLICY "Allow premium/admin insert access" ON public.posts
FOR INSERT TO authenticated
WITH CHECK (
  (user_id = auth.uid()) AND
  ((get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin'))
);

DROP POLICY IF EXISTS "Allow owner to delete" ON public.posts;
CREATE POLICY "Allow owner to delete" ON public.posts
FOR DELETE TO authenticated
USING (
    (user_id = auth.uid())
);


--
-- COMMENTS Table
-- This table stores comments on posts.
--
CREATE TABLE
  public.comments (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts (id) ON DELETE CASCADE
  );
  
--
-- Set up Row Level Security (RLS) for Comments
--
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow premium/admin read access" ON public.comments;
CREATE POLICY "Allow premium/admin read access" ON public.comments
FOR SELECT TO authenticated
USING (
  (get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin')
);

DROP POLICY IF EXISTS "Allow premium/admin insert access" ON public.comments;
CREATE POLICY "Allow premium/admin insert access" ON public.comments
FOR INSERT TO authenticated
WITH CHECK (
  (user_id = auth.uid()) AND
  ((get_user_role(auth.uid()) = 'premium') OR (get_user_role(auth.uid()) = 'admin'))
);

DROP POLICY IF EXISTS "Allow owner to delete" ON public.comments;
CREATE POLICY "Allow owner to delete" ON public.comments
FOR DELETE TO authenticated
USING (
    (user_id = auth.uid())
);
