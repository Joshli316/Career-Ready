CREATE TABLE IF NOT EXISTS `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL UNIQUE,
  `password_hash` text NOT NULL,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `expires_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `user_profiles` (
  `user_id` text PRIMARY KEY NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `beliefs` text,
  `obstacles` text,
  `focus_goals` text,
  `skills` text,
  `work_values` text,
  `brand_statement` text,
  `power_statement` text,
  `email_template` text,
  `voicemail_script` text,
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `applications` (
  `user_id` text PRIMARY KEY NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `master_application` text,
  `assessment_notes` text,
  `portfolio_checklist` text,
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `resumes` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `title` text NOT NULL,
  `template` text NOT NULL,
  `content` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `cover_letters` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `resume_id` text REFERENCES `resumes`(`id`) ON DELETE SET NULL,
  `title` text NOT NULL,
  `content` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `interview_prep` (
  `user_id` text PRIMARY KEY NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `common_responses` text,
  `star_stories` text,
  `company_research` text,
  `thank_you_notes` text,
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `job_search` (
  `user_id` text PRIMARY KEY NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `network_contacts` text,
  `target_companies` text,
  `search_checklist` text,
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `social_media_audit` (
  `user_id` text PRIMARY KEY NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `audit_results` text,
  `platform_profiles` text,
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `self_evaluations` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `month` text NOT NULL,
  `ratings` text,
  `improvements` text,
  `notes` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `employer_contacts` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `company_name` text NOT NULL,
  `position` text NOT NULL,
  `contact_person` text,
  `contact_email` text,
  `contact_phone` text,
  `website` text,
  `address` text,
  `date_applied` text,
  `status` text NOT NULL DEFAULT 'applied',
  `follow_up_date` text,
  `notes` text,
  `source` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS `rate_limits` (
  `key` text NOT NULL,
  `date` text NOT NULL,
  `requests` integer NOT NULL DEFAULT 0,
  PRIMARY KEY (`key`, `date`)
);
