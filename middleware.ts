// ==============================
// 🌍 Middleware i18n pour Next.js
// ==============================

import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales } from './src/i18n/config'

export function middleware(request: NextRequest) {
  // Récupérer la langue depuis les cookies
  const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale

  // Vérifier que la locale est valide
  if (!locales.includes(locale as any)) {
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', defaultLocale)
    return response
  }

  return NextResponse.next()
}

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|.*\\..*).*)'],
}
