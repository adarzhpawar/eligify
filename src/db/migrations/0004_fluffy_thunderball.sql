CREATE TABLE "ai_scheme_searches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"user_prompt" text NOT NULL,
	"matched_scheme_ids" uuid[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_scheme_searches" ADD CONSTRAINT "ai_scheme_searches_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_scheme_searches_user_id_idx" ON "ai_scheme_searches" USING btree ("user_id");