
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
    
    // The user is signing up, so they need to verify their email
    if(data?.user && data.user.identities && data.user.identities.length === 1) {
        const email = data.user.email;
        if (email) {
            return NextResponse.redirect(new URL(`/verify?email=${encodeURIComponent(email)}`, origin));
        }
    }

    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-error', origin))
}
