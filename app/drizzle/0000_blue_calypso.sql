CREATE TABLE IF NOT EXISTS "login_tokens" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"valid" numeric DEFAULT '1' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
