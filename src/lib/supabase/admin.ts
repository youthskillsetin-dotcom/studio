
import { createClient } from '@supabase/supabase-js';

// This is a server-side only client. It uses the service role key,
// which should never be exposed to the client.

// Ensure that the required environment variables are present.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin: ReturnType<typeof createClient> | null = null;

if (!supabaseUrl) {
  console.error('Supabase admin client could not be initialized: NEXT_PUBLIC_SUPABASE_URL is not set. Please check your .env file.');
} else if (!supabaseServiceRoleKey) {
  console.error('Supabase admin client could not be initialized: SUPABASE_SERVICE_ROLE_KEY is not set. This is required for admin operations. Please check your .env file.');
} else {
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
    });
}


export { supabaseAdmin };
