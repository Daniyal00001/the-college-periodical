import { NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt'

export async function middleware(request) {
  const path = request.nextUrl.pathname
  
  // Protected routes
  const isAdminRoute = path.startsWith('/admin/super')
  const isReviewerRoute = path.startsWith('/admin/reviewer')
  
  if (isAdminRoute || isReviewerRoute) {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      console.log('No token found, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Verify token
    const payload = await verifyToken(token)
    
    if (!payload) {
      console.log('Invalid token, redirecting to login')
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
    
    // Check role-based access
    if (isAdminRoute && payload.role !== 'super_admin') {
      console.log('Not super admin, redirecting')
      return NextResponse.redirect(new URL('/admin/reviewer', request.url))
    }
    
    if (isReviewerRoute && payload.role !== 'reviewer') {
      console.log('Not reviewer, redirecting')
      return NextResponse.redirect(new URL('/admin/super', request.url))
    }
    
    console.log('Access granted for:', payload.email, payload.role)
  }
  
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/super/:path*', '/admin/reviewer/:path*']
}