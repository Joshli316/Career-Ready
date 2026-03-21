-- Add extended profile fields that were stored in localStorage but missing from D1
ALTER TABLE user_profiles ADD COLUMN brand_discovery TEXT;
ALTER TABLE user_profiles ADD COLUMN master_app TEXT;
ALTER TABLE user_profiles ADD COLUMN "references" TEXT;
ALTER TABLE user_profiles ADD COLUMN network_contacts TEXT;
ALTER TABLE user_profiles ADD COLUMN social_audit TEXT;
ALTER TABLE user_profiles ADD COLUMN self_evaluation TEXT;
ALTER TABLE user_profiles ADD COLUMN job_search_checklist TEXT;
