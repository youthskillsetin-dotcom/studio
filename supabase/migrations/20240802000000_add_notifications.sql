-- Create a custom type for user roles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'premium', 'admin');
    END IF;
END$$;


-- Create the profiles table if it doesn't exist to ensure the policy dependency is met
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'user',
    full_name TEXT,
    avatar_url TEXT,
    contact_no TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Create the notifications table
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    message TEXT NOT NULL
);

-- Enable Row-Level Security for the notifications table
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all users to read notifications
CREATE POLICY "Allow public read access to notifications"
ON public.notifications
FOR SELECT
USING (true);

-- Policy: Allow only admins to create notifications
CREATE POLICY "Allow admins to create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Note: We assume RLS is already enabled and policies are set for the 'profiles' table.
-- This script only adds what is necessary for the 'notifications' table.
