import { NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt'

export async function middleware(request) {
  const path = request.nextUrl.pathname

  const isApiAdminRoute = path.startsWith('/api/admin')
  const isSuperAdminPageRoute = path.startsWith('/admin/super')
  const isReviewerPageRoute = path.startsWith('/admin/reviewer')
  const isAdminRootPageRoute = path === '/admin' || path === '/admin/'

  // -------------------------------------------------------------
  // 1. API ADMIN ROUTES PROTECTION (Return JSON 401/403)
  // -------------------------------------------------------------
  if (isApiAdminRoute) {
    let token = request.cookies.get('auth-token')?.value

    if (!token) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized. Auth token missing.' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid or expired token.' },
        { status: 401 }
      )
    }

    // Role-specific check for Super Admin APIs
    if (path.startsWith('/api/admin/super') && payload.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Forbidden. Super admin access required.' },
        { status: 403 }
      )
    }

    // Role-specific check for Reviewer APIs
    if (path.startsWith('/api/admin/reviewer') && payload.role !== 'reviewer' && payload.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Forbidden. Reviewer access required.' },
        { status: 403 }
      )
    }

    return NextResponse.next()
  }

  // -------------------------------------------------------------
  // 2. PAGE ADMIN ROUTES PROTECTION (Redirect to /login or role page)
  // -------------------------------------------------------------
  if (isAdminRootPageRoute || isSuperAdminPageRoute || isReviewerPageRoute) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      console.log('No token found for page route, redirecting to /login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const payload = await verifyToken(token)

    if (!payload) {
      console.log('Invalid token for page route, redirecting to /login')
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }

    // Handle root /admin route redirect based on role
    if (isAdminRootPageRoute) {
      if (payload.role === 'super_admin') {
        return NextResponse.redirect(new URL('/admin/super', request.url))
      } else {
        return NextResponse.redirect(new URL('/admin/reviewer', request.url))
      }
    }

    // Super Admin route restriction
    if (isSuperAdminPageRoute && payload.role !== 'super_admin') {
      console.log('User is not super_admin, redirecting to reviewer portal')
      return NextResponse.redirect(new URL('/admin/reviewer', request.url))
    }

    // Reviewer route restriction (allow super_admin to view reviewer portal if desired, else enforce reviewer)
    if (isReviewerPageRoute && payload.role !== 'reviewer' && payload.role !== 'super_admin') {
      console.log('User role mismatch, redirecting to super admin portal')
      return NextResponse.redirect(new URL('/admin/super', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}