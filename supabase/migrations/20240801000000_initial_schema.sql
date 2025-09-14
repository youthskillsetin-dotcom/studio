-- Create the profiles table to store user data
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text,
    avatar_url text,
    contact_no text,
    role public.user_role DEFAULT 'user'::public.user_role NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Comments for profiles table
COMMENT ON TABLE public.profiles IS 'Stores public profile information for each user.';
COMMENT ON COLUMN public.profiles.id IS 'Links to the auth.users table.';

-- Create the subscriptions table to manage user plans
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_active boolean DEFAULT false NOT NULL,
    plan_name text,
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_user_id_key ON public.subscriptions USING btree (user_id);

-- Comments for subscriptions table
COMMENT ON TABLE public.subscriptions IS 'Manages user subscription status and plan details.';

-- Create the transactions table to log payments
CREATE TABLE IF NOT EXISTS public.transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    order_id text NOT NULL,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id text,
    amount numeric,
    status public.transaction_status DEFAULT 'PENDING'::public.transaction_status,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS transactions_order_id_key ON public.transactions USING btree (order_id);

-- Comments for transactions table
COMMENT ON TABLE public.transactions IS 'Logs payment transactions from the payment gateway.';

-- Create the posts table for the community forum
CREATE TABLE IF NOT EXISTS public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now()
);

-- Comments for posts table
COMMENT ON TABLE public.posts IS 'Stores user-generated posts for the community forum.';

-- Create the comments table for the community forum
CREATE TABLE IF NOT EXISTS public.comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    content text NOT NULL,
    post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now()
);

-- Comments for comments table
COMMENT ON TABLE public.comments IS 'Stores comments on community posts.';

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, contact_no, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    'user',
    new.raw_user_meta_data->>'contact_no',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;

-- Trigger to execute the function on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- RLS Policies for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- RLS Policies for Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own subscription." ON public.subscriptions;
CREATE POLICY "Users can view their own subscription." ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for Posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Posts are viewable by everyone." ON public.posts;
CREATE POLICY "Posts are viewable by everyone." ON public.posts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create their own posts." ON public.posts;
CREATE POLICY "Users can create their own posts." ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own posts." ON public.posts;
CREATE POLICY "Users can update their own posts." ON public.posts FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own posts." ON public.posts;
CREATE POLICY "Users can delete their own posts." ON public.posts FOR DELETE USING (auth.uid() = user_id);


-- RLS Policies for Comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Comments are viewable by everyone." ON public.comments;
CREATE POLICY "Comments are viewable by everyone." ON public.comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create their own comments." ON public.comments;
CREATE POLICY "Users can create their own comments." ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own comments." ON public.comments;
CREATE POLICY "Users can update their own comments." ON public.comments FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own comments." ON public.comments;
CREATE POLICY "Users can delete their own comments." ON public.comments FOR DELETE USING (auth.uid() = user_id);


-- No RLS for transactions as they are managed by admin/server roles.
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
