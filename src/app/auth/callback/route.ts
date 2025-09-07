
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
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
            const newResponse = NextResponse.redirect(new URL(next, origin));
            newResponse.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            const newResponse = NextResponse.redirect(new URL(next, origin));
            newResponse.cookies.set({ name, value: '', ...options});
          },
        },
      }
    )
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    // This part is for third-party providers or magic links, not OTP.
    // The user signs up with email/password, then is redirected to /verify page.
    // So this callback is mainly for logins after the initial signup.

    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-error', origin))
}
