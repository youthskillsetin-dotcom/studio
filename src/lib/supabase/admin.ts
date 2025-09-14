
import { createClient } from '@supabase/supabase-js';

// This is a server-side only client. It uses the service role key,
// which should never be exposed to the client.

// Ensure that the required environment variables are present.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseServiceRoleKey) {
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
    });
} else {
    // In development, it's helpful to know if the admin client is missing.
    if (process.env.NODE_ENV === 'development') {
        console.warn("Supabase admin client is not initialized. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file.");
    }
}


export { supabaseAdmin };
