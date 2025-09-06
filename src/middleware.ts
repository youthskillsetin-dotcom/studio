
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl
  
  const adminEmail = 'yashneetkundal@gmail.com';
  const isVerified = session?.user?.email_confirmed_at;

  // Redirect logged-in users from login page to dashboard
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is logged in but not verified, and not on the verify page, redirect them.
  if (session && !isVerified && pathname !== '/verify' && !pathname.startsWith('/api')) {
      return NextResponse.redirect(new URL('/verify', request.url));
  }
  
  // If a user is verified but is on the verify page, redirect to dashboard.
  if (session && isVerified && pathname === '/verify') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
  }


  // Protect app routes for unauthenticated users
  const protectedRoutes = ['/dashboard', '/lessons', '/ai-mentor', '/career-guide', '/community', '/subtopic', '/admin', '/support', '/settings'];
  if (!session && protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect admin routes for non-admin users
  if (session && pathname.startsWith('/admin')) {
      if (session.user.email !== adminEmail) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
      }
  }
  
  // Protect assessment route
  if (!session && pathname === '/assessment') {
     return NextResponse.redirect(new URL('/login', request.url))
  }


  return response
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
