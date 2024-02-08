ALTER TABLE "users" ALTER COLUMN "show_twitter_on_profile" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "twitter_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" DROP DEFAULT;