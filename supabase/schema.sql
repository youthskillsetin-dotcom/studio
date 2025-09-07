-- Create the posts table to store community discussion posts
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create the comments table to store replies to posts
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create the subscriptions table to track user subscription status
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
    plan_name TEXT,
    is_active BOOLEAN NOT NULL DEFAULT false,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- Enable Row Level Security (RLS) for all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for the 'posts' table
-- Allow logged-in users to read all posts
CREATE POLICY "Allow read access to all authenticated users" ON posts
FOR SELECT
TO authenticated
USING (true);

-- Allow users to insert their own posts
CREATE POLICY "Allow users to insert their own posts" ON posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own posts
CREATE POLICY "Allow users to update their own posts" ON posts
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to delete their own posts
CREATE POLICY "Allow users to delete their own posts" ON posts
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- Policies for the 'comments' table
-- Allow logged-in users to read all comments
CREATE POLICY "Allow read access to all authenticated users" ON comments
FOR SELECT
TO authenticated
USING (true);

-- Allow users to insert their own comments
CREATE POLICY "Allow users to insert their own comments" ON comments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own comments
CREATE POLICY "Allow users to update their own comments" ON comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to delete their own comments
CREATE POLICY "Allow users to delete their own comments" ON comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- Policies for the 'subscriptions' table
-- Allow users to view their own subscription
CREATE POLICY "Allow users to view their own subscription" ON subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Note: Inserting/Updating subscriptions should be handled by a secure backend process
-- (like a webhook listening to a payment provider) using the service_role key,
-- so we don't typically grant insert/update permissions to users directly via RLS.
-- If direct creation is needed, a policy would look like this:
-- CREATE POLICY "Allow users to create their own subscription" ON subscriptions
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (auth.uid() = user_id);
