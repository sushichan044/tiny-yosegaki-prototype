ALTER TABLE "projects" ALTER COLUMN "dead_line_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "tags" SET DEFAULT ;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" text DEFAULT 'prepare';