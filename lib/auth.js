import { NextResponse } from 'next/server'
import { verifyToken } from './jwt'

/**
 * Authenticate and authorize an incoming API request.
 * @param {Request} req - Next.js request object
 * @param {string[]} [allowedRoles] - Optional array of required roles (e.g. ['super_admin', 'reviewer'])
 * @returns {Promise<{ user: any, errorResponse: NextResponse | null }>}
 */
export async function getAuthUser(req, allowedRoles = null) {
  try {
    // 1. Check Cookie first, then Authorization Header
    let token = req.cookies.get('auth-token')?.value

    if (!token) {
      const authHeader = req.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      return {
        user: null,
        errorResponse: NextResponse.json(
          { error: 'Unauthorized. Access token is missing.' },
          { status: 401 }
        )
      }
    }

    // 2. Verify JWT Token
    const payload = await verifyToken(token)
    if (!payload || !payload.userId) {
      return {
        user: null,
        errorResponse: NextResponse.json(
          { error: 'Unauthorized. Invalid or expired token.' },
          { status: 401 }
        )
      }
    }

    // 3. Check Role Authorization (if specified)
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(payload.role)) {
        return {
          user: payload,
          errorResponse: NextResponse.json(
            { error: 'Forbidden. You do not have permission to access this resource.' },
            { status: 403 }
          )
        }
      }
    }

    return { user: payload, errorResponse: null }
  } catch (err) {
    console.error('Authentication Error:', err)
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: 'Internal server authentication error.' },
        { status: 500 }
      )
    }
  }
}
