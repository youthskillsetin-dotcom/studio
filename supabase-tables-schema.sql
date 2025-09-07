-- ### Profiles Table ###
-- Stores public-facing user data and roles.

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ,
  full_name TEXT,
  role TEXT DEFAULT 'user'
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Allow individual read access"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow individual update access"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- ### Subscriptions Table ###
-- Stores user subscription status.

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT FALSE,
  plan_name TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  UNIQUE(user_id)
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own subscription
CREATE POLICY "Allow individual read access"
ON public.subscriptions FOR SELECT
USING (auth.uid() = user_id);


-- ### Payments Table ###
-- Logs all payment transactions.

CREATE TABLE IF NOT EXISTS public.payments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'INR',
    status VARCHAR(50) NOT NULL,
    provider VARCHAR(50) DEFAULT 'phonepe',
    provider_payment_id TEXT UNIQUE,
    plan_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own payments
CREATE POLICY "Allow individual read access"
ON public.payments FOR SELECT
USING (auth.uid() = user_id);
