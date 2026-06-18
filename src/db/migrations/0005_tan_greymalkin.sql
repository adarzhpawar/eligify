CREATE TABLE "document_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"scheme_id" uuid NOT NULL,
	"readiness_score" integer,
	"status" text DEFAULT 'pending' NOT NULL,
	"uploaded_documents" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"missing_documents" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"ai_summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "document_checks" ADD CONSTRAINT "document_checks_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_checks" ADD CONSTRAINT "document_checks_scheme_id_schemes_id_fk" FOREIGN KEY ("scheme_id") REFERENCES "public"."schemes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "document_checks_user_id_idx" ON "document_checks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "document_checks_scheme_id_idx" ON "document_checks" USING btree ("scheme_id");