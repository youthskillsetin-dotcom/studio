
-- Create the posts table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
    plan_name TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ROW LEVEL SECURITY POLICIES

-- Policies for 'posts' table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

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


-- Policies for 'comments' table
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

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


-- Policies for 'subscriptions' table
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own subscription
CREATE POLICY "Allow users to view their own subscription" ON subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- NOTE: Inserting/updating subscriptions should typically be handled by a secure server-side
-- process (e.g., a webhook from a payment provider) that uses the service_role key,
-- which bypasses RLS. So, we don't grant insert/update permissions to users directly.
-- If you needed users to create a 'free' subscription row on signup, you might add:
-- CREATE POLICY "Allow users to insert their own free-tier subscription" ON subscriptions
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (auth.uid() = user_id AND is_active = false);

