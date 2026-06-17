ALTER TABLE "conversations" ADD COLUMN "last_message_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "message_user_unique" ON "chat_status" USING btree ("message_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "conversation_user_unique" ON "conversations_participants" USING btree ("conversation_id","user_id");