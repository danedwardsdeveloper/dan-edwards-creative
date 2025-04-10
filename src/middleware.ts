import { type NextRequest, NextResponse } from 'next/server'

import { Token } from '@/library/cookies'
import { cookieName } from '@/library/cookies'
import logger from '@/library/logger'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl

  const flyDomains = ['dan-edwards-creative.fly.dev', 'dec-test.fly.dev']
  const customDomain = 'danedwardscreative.com'

  if (flyDomains.includes(hostname)) {
    return NextResponse.redirect(`https://${customDomain}${url.pathname}${url.search}`)
  }

  const isAnalyticsRoute = url.pathname.startsWith('/api/analytics')

  if (isAnalyticsRoute) {
    const analyticsCookie = request.cookies.get(cookieName)

    if (analyticsCookie) {
      try {
        const token = JSON.parse(analyticsCookie.value) as Token
        const currentTime = Math.floor(Date.now() / 1000)

        if (currentTime < token.exp) {
          logger.debug(`Analytics blocked by middleware for ${url.pathname}`)
          return NextResponse.json({ message: 'Analytics blocked by admin cookie' }, { status: 200 })
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
