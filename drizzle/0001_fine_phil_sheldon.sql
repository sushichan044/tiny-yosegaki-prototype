ALTER TABLE "users" ADD COLUMN "twitter_id" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_name_idx" ON "projects" ("project_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_idx" ON "projects" ("tags");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "users" ("user_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "twitter_id_idx" ON "users" ("twitter_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_twitter_id_unique" UNIQUE("twitter_id");