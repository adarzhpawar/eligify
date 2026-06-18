ALTER TABLE "profiles" ALTER COLUMN "full_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "gender" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "district" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "occupation" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "employment_status" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "annual_income" numeric;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "education" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "preferred_language" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "profile_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id");