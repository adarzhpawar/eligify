CREATE TABLE "saved_schemes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"scheme_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "saved_schemes_user_id_scheme_id_key" UNIQUE("user_id","scheme_id")
);
--> statement-breakpoint
ALTER TABLE "saved_schemes" ADD CONSTRAINT "saved_schemes_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_schemes" ADD CONSTRAINT "saved_schemes_scheme_id_schemes_id_fk" FOREIGN KEY ("scheme_id") REFERENCES "public"."schemes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "saved_schemes_user_id_idx" ON "saved_schemes" USING btree ("user_id");