-- Create users table (handled by Supabase Auth)

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    plan_name text,
    expires_at timestamptz,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Allow authenticated users to read their own subscription"
ON subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for posts
CREATE POLICY "Allow authenticated users to read all posts"
ON posts
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to create posts"
ON posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow author to update their own posts"
ON posts
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow author to delete their own posts"
ON posts
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for comments
CREATE POLICY "Allow authenticated users to read all comments"
ON comments
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to create comments"
ON comments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow author to update their own comments"
ON comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow author to delete their own comments"
ON comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
