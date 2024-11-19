import { type NextRequest, NextResponse } from 'next/server'

import { apiRoutes } from '@/library/apiRoutes'
import { Token } from '@/library/cookies'
import { cookieName } from '@/library/cookies'
import { logger } from '@/library/logger'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl

  const flyDomain = 'dan-edwards-creative.fly.dev'
  const customDomain = 'danedwardscreative.com'

  if (hostname === flyDomain) {
    return NextResponse.redirect(`https://${customDomain}${url.pathname}${url.search}`)
  }

  const isAnalyticsRoute = Object.values(apiRoutes.analytics).some(route => url.pathname === route)

  if (isAnalyticsRoute) {
    const analyticsCookie = request.cookies.get(cookieName)

    if (analyticsCookie) {
      try {
        const token = JSON.parse(analyticsCookie.value) as Token
        const currentTime = Math.floor(Date.now() / 1000)

        if (currentTime < token.exp) {
          logger.debug(`Analytics request blocked for ${url.pathname}`)
          return new NextResponse(null, { status: 204 })
        }
      } catch (error) {
        logger.error('Error parsing analytics exclusion cookie', {
          error: error instanceof Error ? error.message : 'Unknown error',
          url: url.toString(),
        })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
