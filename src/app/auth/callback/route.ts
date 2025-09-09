
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // If the cookie is updated, update the cookies for the request and response
            request.cookies.set({ name, value, ...options })
            const response = NextResponse.redirect(new URL(next, origin));
            response.cookies.set({ name, value, ...options });
            return response;
          },
          remove(name: string, options: CookieOptions) {
            // If the cookie is removed, update the cookies for the request and response
            request.cookies.set({ name, value: '', ...options})
            const response = NextResponse.redirect(new URL(next, origin));
            response.cookies.set({ name, value: '', ...options});
            return response;
          },
        },
      }
    )
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && session && supabaseAdmin) {
       // --- Start of Role Sync Logic ---
        const { user } = session;
        // Fetch the profile role from the database
        const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        // If the database role is different from the token role, update the token.
        if (profile && profile.role !== user.user_metadata.role) {
            await supabaseAdmin.auth.admin.updateUserById(
                user.id,
                { user_metadata: { ...user.user_metadata, role: profile.role } }
            );
        }
        // --- End of Role Sync Logic ---

      return NextResponse.redirect(new URL(next, origin));
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-error', origin))
}
