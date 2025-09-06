-- 1. Create the 'lessons' table
CREATE TABLE lessons (
  id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  title text NOT NULL,
  description text,
  is_free boolean DEFAULT false NOT NULL,
  order_index smallint DEFAULT 0 NOT NULL
);
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;


-- 2. Create the 'subtopics' table
CREATE TABLE subtopics (
  id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  order_index smallint DEFAULT 0 NOT NULL,
  practice_question text,
  practice_type text,
  practice_options jsonb DEFAULT '[]'::jsonb,
  correct_answer text
);
ALTER TABLE subtopics ENABLE ROW LEVEL SECURITY;


-- 3. Create the 'user_subtopic_progress' table
CREATE TABLE user_subtopic_progress (
  id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subtopic_id uuid NOT NULL REFERENCES subtopics(id) ON DELETE CASCADE,
  completed_at timestamptz,
  score smallint,
  status text DEFAULT 'locked'::text NOT NULL,
  CONSTRAINT user_subtopic_progress_user_id_subtopic_id_key UNIQUE (user_id, subtopic_id)
);
ALTER TABLE user_subtopic_progress ENABLE ROW LEVEL SECURITY;


-- 4. Create Policies to allow read access
-- These policies allow any authenticated user to read data from the tables.
-- You can tighten these rules later as needed.

CREATE POLICY "Allow authenticated read access"
ON lessons
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access"
ON subtopics
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow individual read access"
ON user_subtopic_progress
FOR SELECT USING (auth.uid() = user_id);
