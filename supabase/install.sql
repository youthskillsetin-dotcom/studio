
-- Enable the pgcrypto extension if it's not already enabled.
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

-- Drop existing tables to start fresh
DROP TABLE IF EXISTS "public"."comments";
DROP TABLE IF EXISTS "public"."posts";
DROP TABLE IF EXISTS "public"."subscriptions";
DROP TABLE IF EXISTS "public"."user_subtopic_progress";
DROP TABLE IF EXISTS "public"."profiles";

--
-- Create the 'profiles' table
--
CREATE TABLE "public"."profiles" (
    "id"          uuid PRIMARY KEY NOT NULL,
    "created_at"  timestamptz DEFAULT now() NOT NULL,
    "email"       text UNIQUE,
    "role"        text DEFAULT 'user'
);
-- Add foreign key constraint to auth.users
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

--
-- Create the 'subscriptions' table
--
CREATE TABLE "public"."subscriptions" (
    "id"          uuid PRIMARY KEY DEFAULT extensions.gen_random_uuid() NOT NULL,
    "user_id"     uuid UNIQUE NOT NULL,
    "created_at"  timestamptz DEFAULT now() NOT NULL,
    "updated_at"  timestamptz DEFAULT now() NOT NULL,
    "is_active"   boolean DEFAULT false NOT NULL,
    "expires_at"  timestamptz,
    "plan_name"   text
);
-- Add foreign key constraint to profiles
ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Create the 'posts' table
--
CREATE TABLE "public"."posts" (
    "id"          uuid PRIMARY KEY DEFAULT extensions.gen_random_uuid() NOT NULL,
    "created_at"  timestamptz DEFAULT now() NOT NULL,
    "title"       text NOT NULL,
    "content"     text,
    "user_id"     uuid NOT NULL
);
-- Add foreign key constraint to profiles
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

--
-- Create the 'comments' table
--
CREATE TABLE "public"."comments" (
    "id"          uuid PRIMARY KEY DEFAULT extensions.gen_random_uuid() NOT NULL,
    "created_at"  timestamptz DEFAULT now() NOT NULL,
    "content"     text,
    "user_id"     uuid NOT NULL,
    "post_id"     uuid NOT NULL
);
-- Add foreign key constraint to profiles
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
-- Add foreign key constraint to posts
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;

--
-- Create the 'user_subtopic_progress' table
--
CREATE TABLE "public"."user_subtopic_progress" (
    "user_id"       uuid NOT NULL,
    "subtopic_id"   text NOT NULL,
    "completed_at"  timestamptz,
    "score"         integer,
    "status"        text DEFAULT 'unlocked'::text NOT NULL,
    "created_at"    timestamptz DEFAULT now() NOT NULL,
    "updated_at"    timestamptz DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, subtopic_id)
);
-- Add foreign key constraint to profiles
ALTER TABLE "public"."user_subtopic_progress" ADD CONSTRAINT "user_subtopic_progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Function to automatically create a profile when a new user signs up
--
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$;

--
-- Trigger to call handle_new_user on new user creation in auth.users
--
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

--
-- Function to get a user's role
--
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    user_role text;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
    RETURN user_role;
END;
$$;

--
-- RLS Policies for 'profiles' table
--
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated user to read their own profile" ON "public"."profiles" FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow user to update their own profile" ON "public"."profiles" FOR UPDATE USING (auth.uid() = id);

--
-- RLS Policies for 'subscriptions' table
--
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated user to read their own subscription" ON "public"."subscriptions" FOR SELECT USING (auth.uid() = user_id);

--
-- RLS Policies for 'posts' table
--
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to premium users" ON "public"."posts" FOR SELECT USING (get_user_role() IN ('premium', 'admin'));
CREATE POLICY "Allow premium users to insert posts" ON "public"."posts" FOR INSERT WITH CHECK (get_user_role() IN ('premium', 'admin') AND auth.uid() = user_id);
CREATE POLICY "Allow author to update their own post" ON "public"."posts" FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow author to delete their own post" ON "public"."posts" FOR DELETE USING (auth.uid() = user_id);

--
-- RLS Policies for 'comments' table
--
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to premium users" ON "public"."comments" FOR SELECT USING (get_user_role() IN ('premium', 'admin'));
CREATE POLICY "Allow premium users to insert comments" ON "public"."comments" FOR INSERT WITH CHECK (get_user_role() IN ('premium', 'admin') AND auth.uid() = user_id);
CREATE POLICY "Allow author to update their own comment" ON "public"."comments" FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow author to delete their own comment" ON "public"."comments" FOR DELETE USING (auth.uid() = user_id);

--
-- RLS Policies for 'user_subtopic_progress' table
--
ALTER TABLE public.user_subtopic_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow user to read their own progress" ON "public"."user_subtopic_progress" FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow user to insert their own progress" ON "public"."user_subtopic_progress" FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow user to update their own progress" ON "public"."user_subtopic_progress" FOR UPDATE USING (auth.uid() = user_id);

--
-- Set the admin user's role to 'admin'
--
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'work@youthskillset.in';
