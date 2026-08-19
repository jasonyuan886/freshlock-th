import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SITE_URL = 'https://th.freshlocksealer.com'

export async function middleware(request: NextRequest) {
  if (request.headers.get('x-middleware-subrequest')) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  const accept = request.headers.get('accept') || ''
  if (!accept.includes('text/html')) {
    return response
  }

  const innerHeaders = new Headers(request.headers)
  innerHeaders.set('x-middleware-subrequest', 'canonical')
  
  const url = request.nextUrl.clone()
  const res = await fetch(url, { headers: innerHeaders })
  const html = await res.text()

  const path = request.nextUrl.pathname
  const canonical = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  const tag = `<link rel="canonical" href="${canonical}" />`

  let newHtml: string
  if (html.includes('rel="canonical"')) {
    newHtml = html.replace(/<link rel="canonical" href="[^"]*" ?\/?>/, tag)
  } else {
    newHtml = html.replace('<head>', `<head>${tag}`)
  }

  return new NextResponse(newHtml, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  })
}

export const config = {
  matcher: ['/((?!_next|api|favicon|images|logo).*)'],
}
