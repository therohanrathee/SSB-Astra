-- ====================================================================
-- MIGRATION 002: Add PIQ Data & AI Assessment to Candidate Profiles
-- Applied for: SSB ASTRA
-- Execution Order: 002
-- ====================================================================

-- Add JSONB columns for full PIQ dossier, IO Assessment, and upload timestamp
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS piq_data JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS piq_assessment JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_piq_uploaded_at TIMESTAMPTZ DEFAULT NULL;

-- Documentation comments
COMMENT ON COLUMN public.profiles.piq_data IS 'Structured DIPR Form 107-A questionnaire data';
COMMENT ON COLUMN public.profiles.piq_assessment IS 'Senior Interviewing Officer AI assessment, OLQ scores, strengths, and questions';
COMMENT ON COLUMN public.profiles.last_piq_uploaded_at IS 'Timestamp when the candidate last uploaded/analyzed their PIQ scan';
