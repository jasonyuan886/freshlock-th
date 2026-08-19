import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SITE_URL = 'https://th.freshlocksealer.com'

class CanonicalRewriter {
  element(el) {
    const url = new URL(el.getAttribute('href') || '')
    // Only rewrite if it's the root canonical (from layout)
    // Page-level canonical should already be correct
  }
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  
  // Skip static assets, API routes, etc.
  if (url.pathname.startsWith('/_next') || 
      url.pathname.includes('.') ||
      url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Calculate canonical URL
  const path = url.pathname === '/' ? '' : url.pathname
  const canonical = `${SITE_URL}${path}`

  // Get the response
  const response = NextResponse.next()

  // Use HTMLRewriter to inject canonical link tag into <head>
  const rewriter = new HTMLRewriter()
    .on('head', {
      element(el) {
        el.append(`<link rel="canonical" href="${canonical}" />`, { html: true })
      }
    })

  const rewritten = rewriter.transform(response)
  
  // Add debug headers
  rewritten.headers.set('x-canonical-url', canonical)
  rewritten.headers.set('x-middleware-ran', 'true')

  return rewritten
}

export const config = {
  matcher: ['/((?!_next|favicon|images|logo|api).*)'],
}
