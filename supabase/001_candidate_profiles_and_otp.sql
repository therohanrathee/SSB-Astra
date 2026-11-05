-- ====================================================================
-- MIGRATION 001: Candidate Profiles & OTP Verification Schema
-- Applied for: SSB ASTRA
-- Execution Order: 001
-- ====================================================================

-- 1. Create Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  dob DATE,
  target_entry TEXT, -- 'NDA', 'CDS', 'AFCAT', 'TGC', 'TES', 'NCC', 'OTHER'
  profile_completion_pct INTEGER DEFAULT 30, -- Initial 30% on basic onboarding
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Service role can insert profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (true);

-- 2. Create Email OTP Verification Table for Resend delivery
CREATE TABLE IF NOT EXISTS public.email_otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for rapid email lookups
CREATE INDEX IF NOT EXISTS idx_email_otps_lookup ON public.email_otps(email, otp_code);

-- Enable RLS on email_otps (Only accessible via server service_role)
ALTER TABLE public.email_otps ENABLE ROW LEVEL SECURITY;

-- 3. Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, profile_completion_pct)
  VALUES (new.id, new.email, 30)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
