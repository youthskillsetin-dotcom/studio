
-- Drop existing objects if they exist, in reverse order of creation.
DROP TABLE IF EXISTS "public"."comments" CASCADE;
DROP TABLE IF EXISTS "public"."posts" CASCADE;
DROP TABLE IF EXISTS "public"."transactions" CASCADE;
DROP TABLE IF EXISTS "public"."subscriptions" CASCADE;
DROP TABLE IF EXISTS "public"."profiles" CASCADE;

DROP FUNCTION IF EXISTS "public"."handle_new_user" CASCADE;

DROP TYPE IF EXISTS "public"."user_role";
DROP TYPE IF EXISTS "public"."transaction_status";

-- 1. Create custom ENUM types for roles and statuses
CREATE TYPE "public"."user_role" AS ENUM ('user', 'premium', 'admin');
CREATE TYPE "public"."transaction_status" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- 2. Create the profiles table
CREATE TABLE "public"."profiles" (
    "id" "uuid" NOT NULL,
    "full_name" "text",
    "avatar_url" "text",
    "role" "public"."user_role" DEFAULT 'user'::public.user_role NOT NULL,
    "contact_no" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";
ALTER TABLE ONLY "public"."profiles" ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

-- 3. Create the subscriptions table
CREATE TABLE "public"."subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "is_active" boolean DEFAULT false NOT NULL,
    "plan_name" "text",
    "expires_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";
ALTER TABLE ONLY "public"."subscriptions" ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_key" UNIQUE ("user_id");
ALTER TABLE ONLY "public"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

-- 4. Create the transactions table
CREATE TABLE "public"."transactions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "plan_id" "text",
    "amount" numeric,
    "status" "public"."transaction_status" DEFAULT 'PENDING'::public.transaction_status NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."transactions" OWNER TO "postgres";
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "transactions_order_id_key" UNIQUE ("order_id");
ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

-- 5. Create the posts table
CREATE TABLE "public"."posts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "content" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."posts" OWNER TO "postgres";
ALTER TABLE ONLY "public"."posts" ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

-- 6. Create the comments table
CREATE TABLE "public"."comments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "post_id" "uuid" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."comments" OWNER TO "postgres";
ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;
ALTER TABLE ONLY "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


-- 7. Function to create a profile for a new user
CREATE OR REPLACE FUNCTION "public"."handle_new_user"()
RETURNS "trigger"
LANGUAGE "plpgsql"
SECURITY DEFINER
AS $$
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
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

-- 8. Trigger to call the function on new user signup
CREATE TRIGGER "on_auth_user_created"
AFTER INSERT ON "auth"."users"
FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();

-- 9. Enable Row Level Security (RLS) and define policies
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile." ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));
CREATE POLICY "Users can update their own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own subscription." ON "public"."subscriptions" FOR SELECT USING (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."transactions" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own transactions." ON "public"."transactions" FOR SELECT USING (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all posts." ON "public"."posts" FOR SELECT USING (true);
CREATE POLICY "Users can create their own posts." ON "public"."posts" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can update their own posts." ON "public"."posts" FOR UPDATE USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can delete their own posts." ON "public"."posts" FOR DELETE USING (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all comments." ON "public"."comments" FOR SELECT USING (true);
CREATE POLICY "Users can create their own comments." ON "public"."comments" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can update their own comments." ON "public"."comments" FOR UPDATE USING (("auth"."uid"() = "user_id"));
CREATE POLICY "Users can delete their own comments." ON "public"."comments" FOR DELETE USING (("auth"."uid"() = "user_id"));
