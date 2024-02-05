CREATE TABLE IF NOT EXISTS "messages" (
	"author_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"display_name" text NOT NULL,
	"message_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"should_display" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"author_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"dead_line_date" timestamp NOT NULL,
	"project_description" text NOT NULL,
	"project_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_name" text NOT NULL,
	"tags" text[] NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_author_id_users_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_author_id_users_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
