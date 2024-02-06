ALTER TABLE "messages" ADD COLUMN "has_attachment" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "has_thumbnail" boolean DEFAULT false NOT NULL;