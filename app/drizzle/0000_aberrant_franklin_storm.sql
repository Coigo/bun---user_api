CREATE TABLE IF NOT EXISTS "users" (
	"created_at" timestamp DEFAULT now(),
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL
);
