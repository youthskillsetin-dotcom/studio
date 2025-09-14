
import { createClient } from '@supabase/supabase-js';

// This is a server-side only client. It uses the service role key,
// which should never be exposed to the client.

// Ensure that the required environment variables are present.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase admin client could not be initialized: NEXT_PUBLIC_SUPABASE_URL is not set.');
}
if (!supabaseServiceRoleKey) {
    throw new Error('Supabase admin client could not be initialized: SUPABASE_SERVICE_ROLE_KEY is not set. This is required for admin operations.');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
});

export { supabaseAdmin };
