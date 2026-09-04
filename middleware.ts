import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SITE_URL = 'https://th.freshlocksealer.com'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  
  if (url.pathname.startsWith('/_next') || 
      url.pathname.includes('.') ||
      url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const path = url.pathname === '/' ? '' : url.pathname
  const canonical = `${SITE_URL}${path}`

  const response = NextResponse.next()
  response.headers.set('x-canonical-url', canonical)
  response.headers.set('x-middleware-ran', 'true')

  // Noindex utility pages (checkout, cart, success)
  if (url.pathname.startsWith('/checkout') || url.pathname.startsWith('/cart')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|favicon|images|logo|api).*)'],
}
