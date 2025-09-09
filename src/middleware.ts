
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // First, update the user's session.
  const response = await updateSession(request)

  // Create a Supabase client with the updated cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
      },
    }
  )

  // Now, get the current user session.
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
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.endsWith('.ico') || pathname.endsWith('.png') || pathname.endsWith('.json')) {
    return response
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

  // For all other cases, continue with the response from updateSession
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
