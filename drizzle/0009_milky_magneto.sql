ALTER TABLE "projects" ALTER COLUMN "dead_line_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" varchar(10) DEFAULT 'prepare';