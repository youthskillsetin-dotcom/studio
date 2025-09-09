
import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  // First, update the user's session.
  const { supabase, response } = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // If a user is logged in, ensure their role is synchronized.
  if (user) {
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
    
    // If the profile exists and the role in the database is different from the token, update the token.
    if (profile && profile.role !== user.user_metadata.role) {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.warn('SUPABASE_SERVICE_ROLE_KEY is not set. Cannot update user metadata.');
        } else {
            const supabaseAdmin = createAdminClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!,
                { auth: { autoRefreshToken: false, persistSession: false } }
            );

            // Update the user's metadata in the auth schema
            const { error: adminError } = await supabaseAdmin.auth.admin.updateUserById(
                user.id,
                { user_metadata: { ...user.user_metadata, role: profile.role } }
            );

            if (adminError) {
                console.error('Error updating user role in middleware:', adminError.message);
            } else {
                // The token is now updated on the server.
                // The client will get the updated user object on the next request.
            }
        }
    }
  }
  
  // Finally, return the response which now contains the updated session cookies.
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
