--
-- Create `subscriptions` table
--
CREATE TABLE
  subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    is_active boolean NOT NULL DEFAULT FALSE,
    expires_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
  );

--
-- Create RLS policies for `subscriptions`
--
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription." ON subscriptions FOR
SELECT
  USING (auth.uid () = user_id);

--
-- Create `posts` table
--
CREATE TABLE
  posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
  );

--
-- Create RLS policies for `posts`
--
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all posts." ON posts FOR
SELECT
  USING (auth.role () = 'authenticated');

CREATE POLICY "Users can insert their own posts." ON posts FOR INSERT
WITH
  CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own posts." ON posts FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own posts." ON posts FOR DELETE USING (auth.uid () = user_id);

--
-- Create `comments` table
--
CREATE TABLE
  comments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    post_id uuid NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
  );

--
-- Create RLS policies for `comments`
--
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all comments." ON comments FOR
SELECT
  USING (auth.role () = 'authenticated');

CREATE POLICY "Users can insert their own comments." ON comments FOR INSERT
WITH
  CHECK (auth.uid () = user_id);

CREATE POLICY "Users can update their own comments." ON comments FOR
UPDATE USING (auth.uid () = user_id);

CREATE POLICY "Users can delete their own comments." ON comments FOR DELETE USING (auth.uid () = user_id);

--
-- Create a public bucket for post images if needed (optional)
--
-- INSERT INTO
--   storage.buckets (id, name, public)
-- VALUES
--   ('post_images', 'post_images', TRUE);
--
-- CREATE POLICY "Anyone can upload an avatar." ON storage.objects FOR INSERT
-- WITH
--   CHECK (bucket_id = 'post_images');
--
-- CREATE POLICY "Anyone can update an avatar." ON storage.objects FOR
-- UPDATE
--   USING (bucket_id = 'post_images');
