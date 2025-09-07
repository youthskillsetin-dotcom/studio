-- Create Posts table
create table
  public.posts (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    title text not null,
    content text null,
    user_id uuid null default auth.uid (),
    constraint posts_pkey primary key (id),
    constraint posts_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;

-- Create Comments table
create table
  public.comments (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    content text null,
    user_id uuid null default auth.uid (),
    post_id uuid null,
    constraint comments_pkey primary key (id),
    constraint comments_post_id_fkey foreign key (post_id) references posts (id) on update cascade on delete cascade,
    constraint comments_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;

-- Create Subscriptions table
create table
  public.subscriptions (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    user_id uuid not null,
    is_active boolean not null default false,
    expires_at timestamp with time zone null,
    updated_at timestamp with time zone not null default now(),
    plan_name text null,
    constraint subscriptions_pkey primary key (id),
    constraint subscriptions_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete restrict
  ) tablespace pg_default;
  
-- RLS for Posts
alter table public.posts enable row level security;
create policy "Allow all users to view posts" on public.posts for select using (true);
create policy "Allow users to insert their own posts" on public.posts for insert with check (auth.uid () = user_id);
create policy "Allow users to update their own posts" on public.posts for update using (auth.uid () = user_id);
create policy "Allow users to delete their own posts" on public.posts for delete using (auth.uid () = user_id);

-- RLS for Comments
alter table public.comments enable row level security;
create policy "Allow all users to view comments" on public.comments for select using (true);
create policy "Allow users to insert their own comments" on public.comments for insert with check (auth.uid () = user_id);
create policy "Allow users to update their own comments" on public.comments for update using (auth.uid () = user_id);
create policy "Allow users to delete their own comments" on public.comments for delete using (auth.uid () = user_id);

-- RLS for Subscriptions
alter table public.subscriptions enable row level security;
create policy "Allow users to view their own subscriptions" on public.subscriptions for select using (auth.uid () = user_id);
-- Note: You would typically not allow users to directly insert/update subscriptions. 
-- This would be handled by a trusted server-side process (e.g., a webhook from your payment provider).
-- For this app, we will allow it for simulation purposes.
create policy "Allow users to insert their own subscription" on public.subscriptions for insert with check (auth.uid () = user_id);
create policy "Allow users to update their own subscription" on public.subscriptions for update using (auth.uid () = user_id);
