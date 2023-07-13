import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const getLocale = (request: NextRequest) => request.cookies.get('NEXT_LOCALE')

// TODO:Пофиксить для главной страницы
export async function middleware(request: NextRequest) {
  const { pathname, search, locale } = request.nextUrl

  if (pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) return

  const cookiesLocale = getLocale(request)

  if (cookiesLocale && cookiesLocale !== 'ru' && cookiesLocale !== locale)
    return NextResponse.redirect(new URL(`/${cookiesLocale}${pathname}${search}`, request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}
