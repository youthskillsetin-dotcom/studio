
-- Drop existing objects if they exist
DROP TABLE IF EXISTS "public"."comments" CASCADE;
DROP TABLE IF EXISTS "public"."posts" CASCADE;
DROP TABLE IF EXISTS "public"."transactions" CASCADE;
DROP TABLE IF EXISTS "public"."subscriptions" CASCADE;
DROP TABLE IF EXISTS "public"."profiles" CASCADE;
DROP TABLE IF EXISTS "public"."notifications" CASCADE;
DROP TYPE IF EXISTS "public"."user_role";
DROP TYPE IF EXISTS "public"."transaction_status";
DROP FUNCTION IF EXISTS "public"."handle_new_user"();


--  == SETUP ==
-- Create custom types
CREATE TYPE "public"."user_role" AS ENUM ('user', 'premium', 'admin');
CREATE TYPE "public"."transaction_status" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');


--  == TABLES ==
-- Create profiles table
CREATE TABLE "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone not null default now(),
    "full_name" "text",
    "avatar_url" "text",
    "contact_no" "text",
    "role" "user_role" DEFAULT 'user'::"user_role" NOT NULL
);
ALTER TABLE "public"."profiles" OWNER TO "postgres";
ALTER TABLE ONLY "public"."profiles" ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


-- Create subscriptions table
CREATE TABLE "public"."subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone not null default now(),
    "user_id" "uuid" NOT NULL,
    "is_active" boolean DEFAULT false NOT NULL,
    "plan_name" "text",
    "expires_at" timestamp with time zone
);
ALTER TABLE "public"."subscriptions" OWNER TO "postgres";
ALTER TABLE ONLY "public"."subscriptions" ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY "public"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_key" UNIQUE (user_id);
ALTER TABLE ONLY "public"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create transactions table
CREATE TABLE "public"."transactions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "plan_id" "text" NOT NULL,
    "amount" numeric NOT NULL,
    "status" "transaction_status" DEFAULT 'PENDING'::"transaction_status" NOT NULL,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);
ALTER TABLE "public"."transactions" OWNER TO "postgres";
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "transactions_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "transactions_order_id_key" UNIQUE (order_id);
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create posts table
CREATE TABLE "public"."posts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone not null default now(),
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "user_id" "uuid" NOT NULL
);
ALTER TABLE "public"."posts" OWNER TO "postgres";
ALTER TABLE ONLY "public"."posts" ADD CONSTRAINT "posts_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY "public"."posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


-- Create comments table
CREATE TABLE "public"."comments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone not null default now(),
    "content" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "post_id" "uuid" NOT NULL
);
ALTER TABLE "public"."comments" OWNER TO "postgres";
ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;


-- Create notifications table
CREATE TABLE "public"."notifications" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text" NOT NULL,
    "message" "text" NOT NULL
);
ALTER TABLE "public"."notifications" OWNER TO "postgres";
CREATE SEQUENCE "public"."notifications_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE "public"."notifications_id_seq" OWNER TO "postgres";
ALTER SEQUENCE "public"."notifications_id_seq" OWNED BY "public"."notifications"."id";
ALTER TABLE ONLY "public"."notifications" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."notifications_id_seq"'::"regclass");
ALTER TABLE ONLY "public"."notifications" ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");


-- == TRIGGERS & FUNCTIONS ==
-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION "public"."handle_new_user"()
RETURNS "trigger" AS $$
begin
  insert into public.profiles (id, full_name, avatar_url, contact_no)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'contact_no'
  );
  return new;
end;
$$ LANGUAGE "plpgsql" SECURITY DEFINER;
ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

-- Create a trigger to call the function on new user signup
CREATE TRIGGER "on_auth_user_created"
AFTER INSERT ON "auth"."users"
FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();


-- == SECURITY (ROW LEVEL SECURITY) ==

-- Profiles Table RLS
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));
CREATE POLICY "Users can update their own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));


-- Subscriptions Table RLS
ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own subscription." ON "public"."subscriptions" FOR SELECT USING (("auth"."uid"() = "user_id"));


-- Transactions Table RLS
ALTER TABLE "public"."transactions" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own transactions." ON "public"."transactions" FOR SELECT USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Admins have full access" ON "public"."transactions" FOR ALL USING ((SELECT "role" FROM "public"."profiles" WHERE "id" = "auth"."uid"()) = 'admin');


-- Posts Table RLS
ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view all posts." ON "public"."posts" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "Users can insert their own posts." ON "public"."posts" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can update their own posts." ON "public"."posts" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can delete their own posts." ON "public"."posts" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Admins have full access to posts" ON public.posts FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');


-- Comments Table RLS
ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view all comments." ON "public"."comments" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "Users can insert their own comments." ON "public"."comments" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can update their own comments." ON "public"."comments" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can delete their own comments." ON "public"."comments" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Admins have full access to comments" ON public.comments FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');


-- Notifications Table RLS
ALTER TABLE "public"."notifications" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view all notifications." ON "public"."notifications" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "Admins can create notifications" ON "public"."notifications" FOR INSERT WITH CHECK (((SELECT "role" FROM "public"."profiles" WHERE "id" = "auth"."uid"()) = 'admin'::"public"."user_role"));
CREATE POLICY "Admins have full access to notifications" ON "public"."notifications" FOR ALL USING (((SELECT "role" FROM "public"."profiles" WHERE "id" = "auth"."uid"()) = 'admin'::"public"."user_role"));
