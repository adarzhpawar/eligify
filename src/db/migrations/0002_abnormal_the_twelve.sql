CREATE TABLE "schemes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"target_group" text NOT NULL,
	"benefits" text NOT NULL,
	"eligibility" text NOT NULL,
	"application_process" text NOT NULL,
	"required_documents" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"official_url" text,
	"start_date" date,
	"end_date" date,
	"ministry" text NOT NULL,
	"scheme_type" text NOT NULL,
	"occupation_tags" text[] DEFAULT '{}' NOT NULL,
	"state_tags" text[] DEFAULT '{}' NOT NULL,
	"gender_tags" text[] DEFAULT '{}' NOT NULL,
	"education_tags" text[] DEFAULT '{}' NOT NULL,
	"age_min" integer,
	"age_max" integer,
	"income_min" numeric,
	"income_max" numeric,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "schemes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "schemes_occupation_tags_idx" ON "schemes" USING gin ("occupation_tags");--> statement-breakpoint
CREATE INDEX "schemes_state_tags_idx" ON "schemes" USING gin ("state_tags");--> statement-breakpoint
CREATE INDEX "schemes_gender_tags_idx" ON "schemes" USING gin ("gender_tags");--> statement-breakpoint
CREATE INDEX "schemes_education_tags_idx" ON "schemes" USING gin ("education_tags");--> statement-breakpoint
CREATE INDEX "schemes_start_date_idx" ON "schemes" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "schemes_end_date_idx" ON "schemes" USING btree ("end_date");--> statement-breakpoint
CREATE INDEX "schemes_is_active_idx" ON "schemes" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "schemes_category_idx" ON "schemes" USING btree ("category");