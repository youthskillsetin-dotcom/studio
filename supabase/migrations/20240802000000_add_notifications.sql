-- Create the notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    title text NOT NULL,
    message text NOT NULL
);

-- Add comments for clarity
COMMENT ON TABLE public.notifications IS 'Stores broadcast notifications for all users.';

-- Enable Row-Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for the notifications table
-- 1. Allow public read access to everyone
CREATE POLICY "Allow public read access to notifications"
ON public.notifications
FOR SELECT
TO public
USING (true);

-- 2. Allow admin users to insert new notifications
CREATE POLICY "Allow admin to insert notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 3. (Optional) Allow admins to update/delete, though the app doesn't use this yet.
CREATE POLICY "Allow admin to update/delete notifications"
ON public.notifications
FOR UPDATE, DELETE
TO authenticated
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
