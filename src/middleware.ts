

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // If Supabase keys are not set, we bypass the middleware logic
    // to avoid crashes, allowing public pages to render.
    // Protected pages will fail gracefully inside their components.
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/verify');
  
  // If the user is not logged in and trying to access a protected app route
  if (!user && !isAuthRoute && pathname !== '/') {
     const url = request.nextUrl.clone();
     url.pathname = '/login';
     // You can optionally add the intended destination as a query parameter
     // url.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(url);
  }
  
  // If the user is logged in and trying to access an auth route (like login/signup)
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url)
  }

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    if (!user) {
         const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
    // In a real app, you would check a 'profiles' table for the user's role.
    // For this demo, we simulate by checking a specific email.
    if (user.email !== 'work@youthskillset.in') {
         const url = request.nextUrl.clone();
        url.pathname = '/dashboard'; // Redirect non-admins away
        return NextResponse.redirect(url);
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (the root landing page, which is now handled explicitly in the middleware)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
