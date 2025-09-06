
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

  // Redirect logged-in users from login page to dashboard
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect app routes for unauthenticated users
  const protectedRoutes = ['/dashboard', '/lessons', '/ai-mentor', '/career-guide', '/community', '/subtopic', '/admin', '/support', '/settings'];
  if (!session && protectedRoutes.some(path => pathname.startsWith(path))) {
    // Add logic to redirect to a specific page if they are trying to access a post
    const communityPostRegex = /^\/community\/post\/[a-zA-Z0-9-]+$/;
    if(communityPostRegex.test(pathname)) {
        return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url))
    }
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
