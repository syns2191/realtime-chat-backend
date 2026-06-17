CREATE TYPE "public"."invite_status_enum" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE "friend_list" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "friend_list_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"friend_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "friendship" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "friendship_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"requester" integer NOT NULL,
	"addresser" integer NOT NULL,
	"status" "invite_status_enum",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "friend_list" ADD CONSTRAINT "friend_list_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friend_list" ADD CONSTRAINT "friend_list_friend_id_users_id_fk" FOREIGN KEY ("friend_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_requester_users_id_fk" FOREIGN KEY ("requester") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_addresser_users_id_fk" FOREIGN KEY ("addresser") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "frienlist_user_unique" ON "friend_list" USING btree ("friend_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "friendship_user_unique" ON "friendship" USING btree ("requester","addresser");