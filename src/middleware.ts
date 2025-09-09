
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // First, let's refresh the session.
  const { supabase, response } = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options })
          const res = NextResponse.next({ request })
          res.cookies.set({ name, value, ...options })
          return res
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options })
          const res = NextResponse.next({ request })
          res.cookies.set({ name, value: '', ...options })
          return res
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Define public routes that don't require authentication
  const isPublicRoute = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/update-password',
    '/verify-otp',
    '/about',
    '/pricing',
    '/support',
    '/terms',
    '/privacy',
    '/refund-policy',
    '/auth/callback'
  ].includes(pathname)

  // API routes and static assets should be ignored
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.endsWith('.ico') || pathname.endsWith('.png')) {
    return NextResponse.next()
  }

  // If the user is not logged in and is trying to access a protected route
  if (!session && !isPublicRoute) {
    // Redirect them to the login page
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is logged in and tries to access an auth page like login/signup
  if (session && (pathname === '/login' || pathname === '/signup' || pathname === '/verify-otp')) {
    // Redirect them to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

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
