CREATE TABLE IF NOT EXISTS "messages" (
	"attachment_file_name" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_accepted" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"created_at" timestamp DEFAULT now(),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"twitter_avatar_url" text NOT NULL,
	"twitter_display_name" text NOT NULL,
	"twitter_name" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL,
	"user_name" text NOT NULL,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
