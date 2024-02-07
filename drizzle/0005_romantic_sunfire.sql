CREATE TABLE IF NOT EXISTS "users_to_joined_projects" (
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "users_to_joined_projects_project_id_user_id_pk" PRIMARY KEY("project_id","user_id")
);
--> statement-breakpoint
DROP TABLE "users_to_projects";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_joined_projects" ADD CONSTRAINT "users_to_joined_projects_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_joined_projects" ADD CONSTRAINT "users_to_joined_projects_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
